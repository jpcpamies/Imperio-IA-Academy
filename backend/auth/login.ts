import { api, APIError, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

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

// Authenticates a user and returns a session token.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    console.log(`🔐 LOGIN ATTEMPT - Email: ${req.email}`);

    if (!req.email || !req.password) {
      console.log(`🔐 LOGIN FAILED - Missing credentials for: ${req.email}`);
      throw APIError.invalidArgument("email and password are required");
    }

    try {
      console.log(`🔐 STEP 1 - Fetching user from database for: ${req.email}`);
      
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        password_hash: string;
        name: string;
        role: string;
      }>`SELECT id, email, password_hash, name, role FROM users WHERE email = ${req.email}`;

      if (!user) {
        console.log(`🔐 LOGIN FAILED - User not found: ${req.email}`);
        throw APIError.unauthenticated("Email o contraseña incorrectos");
      }

      console.log(`🔐 STEP 2 - User found: ${user.email}, ID: ${user.id}, Role: ${user.role}`);
      console.log(`🔐 STEP 2 - Password hash exists: ${!!user.password_hash}`);
      console.log(`🔐 STEP 2 - Password hash length: ${user.password_hash ? user.password_hash.length : 0}`);
      console.log(`🔐 STEP 2 - Password hash format check: ${user.password_hash ? user.password_hash.substring(0, 7) : 'N/A'}`);

      if (!user.password_hash) {
        console.log(`🔐 LOGIN FAILED - No password hash for user: ${req.email}`);
        throw APIError.unauthenticated("Usuario no tiene contraseña configurada");
      }

      console.log(`🔐 STEP 3 - Starting password verification for: ${req.email}`);
      console.log(`🔐 STEP 3 - Input password: "${req.password}"`);
      console.log(`🔐 STEP 3 - Input password length: ${req.password.length}`);
      console.log(`🔐 STEP 3 - Stored hash: ${user.password_hash}`);
      console.log(`🔐 STEP 3 - Hash starts with: ${user.password_hash.substring(0, 10)}...`);

      // Validate bcrypt hash format
      const bcryptRegex = /^\$2[aby]?\$\d{1,2}\$.{53}$/;
      const isValidBcryptHash = bcryptRegex.test(user.password_hash);
      console.log(`🔐 STEP 3 - Hash format validation: ${isValidBcryptHash ? 'VALID' : 'INVALID'}`);

      if (!isValidBcryptHash) {
        console.log(`🔐 STEP 3 - CRITICAL: Invalid bcrypt hash format detected!`);
        console.log(`🔐 STEP 3 - Hash: ${user.password_hash}`);
        throw APIError.internal("Invalid password hash format in database");
      }

      let isValidPassword = false;
      try {
        console.log(`🔐 STEP 3 - Calling bcrypt.compare...`);
        isValidPassword = await bcrypt.compare(req.password, user.password_hash);
        console.log(`🔐 STEP 3 - bcrypt.compare result: ${isValidPassword}`);
        
        // Additional debugging: try manual verification
        console.log(`🔐 STEP 3 - Manual verification attempt...`);
        const manualHash = await bcrypt.hash(req.password, 10);
        console.log(`🔐 STEP 3 - Manual hash of input password: ${manualHash}`);
        
        // Test with different salt rounds
        const testHash12 = await bcrypt.hash(req.password, 12);
        console.log(`🔐 STEP 3 - Test hash (12 rounds): ${testHash12}`);
        
        // Try comparing with different approaches
        const directCompare = await bcrypt.compare(req.password, user.password_hash);
        console.log(`🔐 STEP 3 - Direct compare result: ${directCompare}`);
        
      } catch (bcryptError) {
        console.error(`🔐 STEP 3 - Bcrypt comparison error:`, bcryptError);
        console.error(`🔐 STEP 3 - Error name: ${bcryptError.name}`);
        console.error(`🔐 STEP 3 - Error message: ${bcryptError.message}`);
        console.error(`🔐 STEP 3 - Error stack: ${bcryptError.stack}`);
        throw APIError.internal("Error during password verification");
      }

      if (!isValidPassword) {
        console.log(`🔐 LOGIN FAILED - Invalid password for user: ${req.email}`);
        console.log(`🔐 LOGIN FAILED - Provided: "${req.password}"`);
        console.log(`🔐 LOGIN FAILED - Hash in DB: ${user.password_hash}`);
        
        // Development mode: try some common test passwords
        console.log(`🔐 DEV MODE - Testing common passwords...`);
        const testPasswords = ['123456', 'password', 'test123', req.email.split('@')[0]];
        for (const testPwd of testPasswords) {
          try {
            const testResult = await bcrypt.compare(testPwd, user.password_hash);
            console.log(`🔐 DEV MODE - Test password "${testPwd}": ${testResult ? 'MATCH' : 'NO MATCH'}`);
            if (testResult) {
              console.log(`🔐 DEV MODE - FOUND WORKING PASSWORD: "${testPwd}"`);
            }
          } catch (e) {
            console.log(`🔐 DEV MODE - Error testing "${testPwd}": ${e.message}`);
          }
        }
        
        throw APIError.unauthenticated("Email o contraseña incorrectos");
      }

      console.log(`🔐 STEP 4 - Password verified successfully for: ${req.email}`);
      console.log(`🔐 STEP 4 - Starting JWT token generation`);

      let token = "";
      try {
        const jwtSecretValue = jwtSecret();
        console.log(`🔐 STEP 4 - JWT secret available: ${!!jwtSecretValue}`);
        console.log(`🔐 STEP 4 - JWT secret length: ${jwtSecretValue ? jwtSecretValue.length : 0}`);

        token = jwt.sign(
          { userId: user.id, email: user.email },
          jwtSecretValue,
          { expiresIn: "7d" }
        );
        console.log(`🔐 STEP 4 - JWT token generated successfully`);
        console.log(`🔐 STEP 4 - Token length: ${token.length}`);
        console.log(`🔐 STEP 4 - Token starts with: ${token.substring(0, 20)}...`);
      } catch (jwtError) {
        console.error(`🔐 STEP 4 - JWT generation error:`, jwtError);
        throw APIError.internal("Error during token generation");
      }

      console.log(`🔐 STEP 5 - Creating session cookie for: ${req.email}`);

      const sessionCookie = {
        value: token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "Lax" as const,
      };

      console.log(`🔐 STEP 5 - Session cookie created, expires: ${sessionCookie.expires}`);

      const response = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: sessionCookie,
      };

      console.log(`🔐 LOGIN SUCCESS - User: ${req.email}, Role: ${user.role}, ID: ${user.id}`);
      console.log(`🔐 LOGIN SUCCESS - Response user object:`, response.user);

      return response;

    } catch (error) {
      console.error(`🔐 LOGIN ERROR - Unexpected error for ${req.email}:`, error);
      console.error(`🔐 LOGIN ERROR - Error type: ${error.constructor.name}`);
      console.error(`🔐 LOGIN ERROR - Error message: ${error.message}`);
      console.error(`🔐 LOGIN ERROR - Error stack: ${error.stack}`);
      
      // Re-throw APIErrors as-is
      if (error instanceof APIError) {
        throw error;
      }
      
      // Wrap other errors
      throw APIError.internal("Error interno del servidor durante el login");
    }
  }
);
