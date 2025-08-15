import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as crypto from "crypto";

const coursesDB = SQLDatabase.named("courses");

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  session: Cookie<"session">;
}

// Hash password using Node.js built-in crypto
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Generate secure session token
function generateSessionToken(userId: number): string {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `session_${userId}_${timestamp}_${randomBytes}`;
}

// Validates email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validates password strength
function isValidPassword(password: string): boolean {
  return password && password.length >= 6;
}

// Validates name
function isValidName(name: string): boolean {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
}

export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    try {
      // Input validation
      if (!req.email || !req.password || !req.name) {
        throw APIError.invalidArgument("email, password, and name are required");
      }

      // Trim and sanitize inputs
      const email = req.email.trim().toLowerCase();
      const name = req.name.trim();
      const password = req.password;

      // Validate email format
      if (!isValidEmail(email)) {
        throw APIError.invalidArgument("invalid email format");
      }

      // Validate password strength
      if (!isValidPassword(password)) {
        throw APIError.invalidArgument("password must be at least 6 characters");
      }

      // Validate name
      if (!isValidName(name)) {
        throw APIError.invalidArgument("name must be between 2 and 100 characters");
      }

      // Check if user already exists
      let existingUser;
      try {
        existingUser = await coursesDB.queryRow<{ id: number }>`
          SELECT id FROM users WHERE email = ${email}
        `;
      } catch (dbError) {
        console.error("Database error checking existing user:", dbError);
        throw APIError.internal("database connection error");
      }

      if (existingUser) {
        throw APIError.alreadyExists("user with this email already exists");
      }

      // Hash the password
      let passwordHash;
      try {
        passwordHash = hashPassword(password);
      } catch (hashError) {
        console.error("Password hashing error:", hashError);
        throw APIError.internal("password processing error");
      }

      // Create user
      let user;
      try {
        user = await coursesDB.queryRow<{
          id: number;
          email: string;
          name: string;
          role: string;
        }>`
          INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
          VALUES (${email}, ${passwordHash}, ${name}, 'user', NOW(), NOW())
          RETURNING id, email, name, role
        `;
      } catch (dbError) {
        console.error("Database error creating user:", dbError);
        
        // Check for specific database errors
        if (dbError && typeof dbError === 'object') {
          const errorMessage = (dbError as any).message || '';
          
          if (errorMessage.includes('duplicate key') || 
              errorMessage.includes('unique constraint') ||
              errorMessage.includes('UNIQUE constraint')) {
            throw APIError.alreadyExists("user with this email already exists");
          }
          
          if (errorMessage.includes('connection') || 
              errorMessage.includes('timeout')) {
            throw APIError.unavailable("database temporarily unavailable");
          }
        }
        
        throw APIError.internal("failed to create user account");
      }

      if (!user) {
        throw APIError.internal("failed to create user - no data returned");
      }

      // Generate secure session token
      let sessionToken;
      try {
        sessionToken = generateSessionToken(user.id);
      } catch (tokenError) {
        console.error("Session token generation error:", tokenError);
        throw APIError.internal("session creation error");
      }

      // Create session cookie
      const sessionCookie = {
        value: sessionToken,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: sessionCookie,
      };

    } catch (error) {
      // Re-throw APIError instances
      if (error instanceof APIError) {
        throw error;
      }
      
      // Log unexpected errors
      console.error("Unexpected registration error:", error);
      
      // Return generic internal error for security
      throw APIError.internal("registration failed - please try again");
    }
  }
);
