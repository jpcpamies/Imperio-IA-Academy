import { authHandler } from "encore.dev/auth";
import { APIError, Header, Cookie } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { secret } from "encore.dev/config";

const coursesDB = SQLDatabase.named("courses");
const jwtSecret = secret("JWTSecret");

interface AuthParams {
  authorization?: Header<"Authorization">;
  session?: Cookie<"session">;
}

export interface AuthData {
  userID: string;
  email: string;
  name: string;
  role: string;
}

const auth = authHandler<AuthParams, AuthData>(
  async (data) => {
    console.log(`🔐 AUTH HANDLER - Starting authentication check`);
    
    const token = data.authorization?.replace("Bearer ", "") ?? data.session?.value;
    if (!token) {
      console.log(`🔐 AUTH HANDLER - No token provided`);
      throw APIError.unauthenticated("missing token");
    }

    console.log(`🔐 AUTH HANDLER - Token found, length: ${token.length}`);
    console.log(`🔐 AUTH HANDLER - Token starts with: ${token.substring(0, 20)}...`);

    try {
      const jwtSecretValue = jwtSecret();
      console.log(`🔐 AUTH HANDLER - JWT secret available: ${!!jwtSecretValue}`);
      
      const decoded = jwt.verify(token, jwtSecretValue) as any;
      console.log(`🔐 AUTH HANDLER - Token decoded successfully`);
      console.log(`🔐 AUTH HANDLER - Decoded userId: ${decoded.userId}, email: ${decoded.email}`);
      
      const user = await coursesDB.queryRow<{
        id: number;
        email: string;
        name: string;
        role: string;
      }>`SELECT id, email, name, role FROM users WHERE id = ${decoded.userId}`;

      if (!user) {
        console.log(`🔐 AUTH HANDLER - User not found for ID: ${decoded.userId}`);
        throw APIError.unauthenticated("user not found");
      }

      console.log(`🔐 AUTH HANDLER - User found: ${user.email}, Role: ${user.role}`);

      const authData = {
        userID: user.id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      };

      console.log(`🔐 AUTH HANDLER - Authentication successful for: ${user.email}`);
      return authData;

    } catch (err) {
      console.error(`🔐 AUTH HANDLER - Authentication failed:`, err);
      
      if (err instanceof jwt.JsonWebTokenError) {
        console.log(`🔐 AUTH HANDLER - JWT error type: ${err.name}, message: ${err.message}`);
      }
      
      throw APIError.unauthenticated("invalid token", err);
    }
  }
);

export default auth;
