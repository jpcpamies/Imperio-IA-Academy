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
    console.log(`🔐 REGISTER ATTEMPT - Email: ${req.email}, Name: ${req.name}`);

    if (!req.email || !req.password || !req.name) {
      console.log(`🔐 REGISTER FAILED - Missing required fields for: ${req.email}`);
      throw APIError.invalidArgument("email, password, and name are required");
    }

    if (req.password.length < 6) {
      console.log(`🔐 REGISTER FAILED - Password too short for: ${req.email}`);
      throw APIError.invalidArgument("password must be at least 6 characters");
    }

    try {
      console.log(`🔐 REGISTER STEP 1 - Checking if user exists: ${req.email}`);
      
      // Check if user already exists
      const existingUser = await coursesDB.queryRow<{ id: number }>`
        SELECT id FROM users WHERE email = ${req.email}
      `;

      if (existingUser) {
        console.log(`🔐 REGISTER FAILED - User already exists: ${req.email}`);
        throw APIError.alreadyExists("user with this email already exists");
      }

      console.log(`🔐 REGISTER STEP 2 - Hashing password for: ${req.email}`);
      console.log(`🔐 REGISTER STEP 2 - Input password: "${req.password}"`);
      console.log(`🔐 REGISTER STEP 2 - Password length: ${req.password.length}`);

      // Hash password with consistent salt rounds
      const saltRounds = 10;
      console.log(`🔐 REGISTER STEP 2 - Using salt rounds: ${saltRounds}`);
      
      const passwordHash = await bcrypt.hash(req.password, saltRounds);
      console.log(`🔐 REGISTER STEP 2 - Password hashed successfully`);
      console.log(`🔐 REGISTER STEP 2 - Hash length: ${passwordHash.length}`);
      console.log(`🔐 REGISTER STEP 2 - Hash format: ${passwordHash.substring(0, 10)}...`);
      console.log(`🔐 REGISTER STEP 2 - Full hash: ${passwordHash}`);

      // Validate the hash format
      const bcryptRegex = /^\$2[aby]?\$\d{1,2}\$.{53}$/;
      const isValidHash = bcryptRegex.test(passwordHash);
      console.log(`🔐 REGISTER STEP 2 - Hash format validation: ${isValidHash ? 'VALID' : 'INVALID'}`);

      if (!isValidHash) {
        console.error(`🔐 REGISTER STEP 2 - CRITICAL: Generated invalid hash format!`);
        throw APIError.internal("Failed to generate valid password hash");
      }

      // Test the hash immediately after creation
      console.log(`🔐 REGISTER STEP 2 - Testing hash immediately...`);
      const immediateTest = await bcrypt.compare(req.password, passwordHash);
      console.log(`🔐 REGISTER STEP 2 - Immediate hash test: ${immediateTest ? 'PASS' : 'FAIL'}`);

      if (!immediateTest) {
        console.error(`🔐 REGISTER STEP 2 - CRITICAL: Hash verification failed immediately after creation!`);
        throw APIError.internal("Password hash verification failed");
      }

      console.log(`🔐 REGISTER STEP 3 - Creating user in database: ${req.email}`);

      // Create user
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
        console.log(`🔐 REGISTER FAILED - Database insert failed for: ${req.email}`);
        throw APIError.internal("failed to create user");
      }

      console.log(`🔐 REGISTER STEP 4 - User created successfully: ${user.email}, ID: ${user.id}`);

      // Verify the user was created with correct hash
      console.log(`🔐 REGISTER STEP 4 - Verifying stored hash...`);
      const storedUser = await coursesDB.queryRow<{
        password_hash: string;
      }>`SELECT password_hash FROM users WHERE id = ${user.id}`;

      if (storedUser) {
        console.log(`🔐 REGISTER STEP 4 - Stored hash: ${storedUser.password_hash}`);
        console.log(`🔐 REGISTER STEP 4 - Hash matches: ${storedUser.password_hash === passwordHash}`);
        
        // Test the stored hash
        const storedHashTest = await bcrypt.compare(req.password, storedUser.password_hash);
        console.log(`🔐 REGISTER STEP 4 - Stored hash test: ${storedHashTest ? 'PASS' : 'FAIL'}`);
      }

      console.log(`🔐 REGISTER STEP 5 - Generating JWT token for: ${user.email}`);

      // Generate JWT token for immediate login
      let token = "";
      try {
        const jwtSecretValue = jwtSecret();
        console.log(`🔐 REGISTER STEP 5 - JWT secret available: ${!!jwtSecretValue}`);

        token = jwt.sign(
          { userId: user.id, email: user.email },
          jwtSecretValue,
          { expiresIn: "7d" }
        );
        console.log(`🔐 REGISTER STEP 5 - JWT token generated successfully`);
      } catch (jwtError) {
        console.error(`🔐 REGISTER STEP 5 - JWT generation error:`, jwtError);
        throw APIError.internal("Error during token generation");
      }

      const sessionCookie = {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      const response = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: sessionCookie,
      };

      console.log(`🔐 REGISTER SUCCESS - User: ${req.email}, Role: ${user.role}, ID: ${user.id}`);
      return response;

    } catch (error) {
      console.error(`🔐 REGISTER ERROR - Unexpected error for ${req.email}:`, error);
      console.error(`🔐 REGISTER ERROR - Error type: ${error.constructor.name}`);
      console.error(`🔐 REGISTER ERROR - Error message: ${error.message}`);
      console.error(`🔐 REGISTER ERROR - Error stack: ${error.stack}`);
      
      // Re-throw APIErrors as-is
      if (error instanceof APIError) {
        throw error;
      }
      
      // Wrap other errors
      throw APIError.internal("Error interno del servidor durante el registro");
    }
  }
);
