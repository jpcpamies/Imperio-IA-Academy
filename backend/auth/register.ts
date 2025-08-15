import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

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

// Registers a new user account.
export const register = api<RegisterRequest, RegisterResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    console.log(`🔐 REGISTRATION START - Email: ${req.email}, Name: ${req.name}`);

    if (!req.email || !req.password || !req.name) {
      console.log(`🔐 REGISTRATION ERROR - Missing required fields`);
      throw APIError.invalidArgument("email, password, and name are required");
    }

    if (req.password.length < 6) {
      console.log(`🔐 REGISTRATION ERROR - Password too short`);
      throw APIError.invalidArgument("password must be at least 6 characters");
    }

    try {
      // First, let's check how many users exist in total
      const userCount = await coursesDB.queryRow<{ count: number }>`
        SELECT COUNT(*) as count FROM users
      `;
      console.log(`🔐 REGISTRATION DEBUG - Total users in database: ${userCount?.count || 0}`);

      // Check if user already exists
      console.log(`🔐 REGISTRATION DEBUG - Checking if email ${req.email} exists...`);
      const existingUser = await coursesDB.queryRow<{ id: number; email: string }>`
        SELECT id, email FROM users WHERE email = ${req.email}
      `;

      if (existingUser) {
        console.log(`🔐 REGISTRATION ERROR - Email already exists: ${existingUser.email} (ID: ${existingUser.id})`);
        throw APIError.alreadyExists("user with this email already exists");
      }

      console.log(`🔐 REGISTRATION DEBUG - Email ${req.email} is available, proceeding with registration`);

      // Hash password
      console.log(`🔐 REGISTRATION DEBUG - Hashing password...`);
      const passwordHash = await bcrypt.hash(req.password, 10);
      console.log(`🔐 REGISTRATION DEBUG - Password hashed successfully`);

      // Create user
      console.log(`🔐 REGISTRATION DEBUG - Creating user in database...`);
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        name: string;
        role: string;
      }>`
        INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
        VALUES (${req.email}, ${passwordHash}, ${req.name}, 'user', NOW(), NOW())
        RETURNING id, email, name, role
      `;

      if (!user) {
        console.log(`🔐 REGISTRATION ERROR - Failed to create user in database`);
        throw APIError.internal("failed to create user");
      }

      console.log(`🔐 REGISTRATION SUCCESS - User created: ID ${user.id}, Email: ${user.email}, Name: ${user.name}`);

      // Generate JWT token for immediate login
      console.log(`🔐 REGISTRATION DEBUG - Generating JWT token...`);
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret(),
        { expiresIn: "7d" }
      );

      const sessionCookie = {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      console.log(`🔐 REGISTRATION COMPLETE - User ${user.email} registered and logged in successfully`);

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
      console.log(`🔐 REGISTRATION CATCH - Error type: ${error?.constructor?.name}`);
      console.log(`🔐 REGISTRATION CATCH - Error message: ${error?.message}`);
      console.log(`🔐 REGISTRATION CATCH - Full error:`, error);

      // Re-throw APIErrors as-is
      if (error instanceof APIError) {
        console.log(`🔐 REGISTRATION CATCH - Re-throwing APIError: ${error.message}`);
        throw error;
      }
      
      // Check for database constraint violations
      if (error?.message?.includes('duplicate key') || error?.message?.includes('unique constraint')) {
        console.log(`🔐 REGISTRATION CATCH - Database constraint violation detected`);
        throw APIError.alreadyExists("user with this email already exists");
      }
      
      // Wrap other errors
      console.log(`🔐 REGISTRATION CATCH - Wrapping unknown error as internal server error`);
      throw APIError.internal("Error interno del servidor durante el registro");
    }
  }
);
