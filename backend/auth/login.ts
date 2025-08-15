import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as crypto from "crypto";

const coursesDB = SQLDatabase.named("courses");

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  session: Cookie<"session">;
}

// Verify password against hash
function verifyPassword(password: string, hash: string): boolean {
  try {
    const [salt, storedHash] = hash.split(':');
    if (!salt || !storedHash) {
      return false;
    }
    
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return storedHash === verifyHash;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
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

export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    try {
      // Input validation
      if (!req.email || !req.password) {
        throw APIError.invalidArgument("email and password are required");
      }

      // Trim and sanitize inputs
      const email = req.email.trim().toLowerCase();
      const password = req.password;

      // Validate email format
      if (!isValidEmail(email)) {
        throw APIError.invalidArgument("invalid email format");
      }

      // Validate password
      if (!password || password.length < 1) {
        throw APIError.invalidArgument("password is required");
      }

      // Find user by email
      let user;
      try {
        user = await coursesDB.queryRow<{
          id: number;
          email: string;
          password_hash: string;
          name: string;
          role: string;
        }>`SELECT id, email, password_hash, name, role FROM users WHERE email = ${email}`;
      } catch (dbError) {
        console.error("Database error during login:", dbError);
        throw APIError.internal("authentication service temporarily unavailable");
      }

      if (!user) {
        throw APIError.unauthenticated("invalid email or password");
      }

      // Verify password
      let passwordValid = false;
      try {
        // Check if it's a legacy plain text password (for backward compatibility)
        if (!user.password_hash.includes(':')) {
          // Legacy plain text comparison
          passwordValid = user.password_hash === password;
        } else {
          // New hashed password verification
          passwordValid = verifyPassword(password, user.password_hash);
        }
      } catch (verifyError) {
        console.error("Password verification error:", verifyError);
        throw APIError.internal("authentication processing error");
      }

      if (!passwordValid) {
        throw APIError.unauthenticated("invalid email or password");
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
      console.error("Unexpected login error:", error);
      
      // Return generic error for security
      throw APIError.internal("login failed - please try again");
    }
  }
);
