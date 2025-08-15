import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import * as bcrypt from "bcrypt";

const coursesDB = SQLDatabase.named("courses");

export interface DebugLoginRequest {
  email: string;
}

export interface DebugLoginResponse {
  userExists: boolean;
  userInfo?: {
    id: number;
    email: string;
    name: string;
    role: string;
    hasPassword: boolean;
    passwordHashLength?: number;
    passwordHashPrefix?: string;
  };
  testPasswordResult?: {
    testPassword: string;
    isValid: boolean;
    error?: string;
  };
}

// Debug endpoint to check user login status (development only).
export const debugLogin = api<DebugLoginRequest, DebugLoginResponse>(
  { expose: true, method: "POST", path: "/auth/debug/login" },
  async (req) => {
    console.log(`🐛 DEBUG LOGIN - Starting debug check for: ${req.email}`);

    const user = await coursesDB.queryRow<{
      id: number;
      email: string;
      name: string;
      role: string;
      password_hash: string;
    }>`SELECT id, email, name, role, password_hash FROM users WHERE email = ${req.email}`;

    if (!user) {
      console.log(`🐛 DEBUG LOGIN - User not found: ${req.email}`);
      return {
        userExists: false,
      };
    }

    console.log(`🐛 DEBUG LOGIN - User found: ${user.email}, Role: ${user.role}, Has Password: ${!!user.password_hash}`);
    console.log(`🐛 DEBUG LOGIN - Password hash length: ${user.password_hash ? user.password_hash.length : 0}`);
    
    const response: DebugLoginResponse = {
      userExists: true,
      userInfo: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        hasPassword: !!user.password_hash,
        passwordHashLength: user.password_hash ? user.password_hash.length : 0,
        passwordHashPrefix: user.password_hash ? user.password_hash.substring(0, 10) : undefined,
      },
    };

    // Test with a common test password if hash exists
    if (user.password_hash) {
      const testPassword = "123456"; // Common test password
      try {
        console.log(`🐛 DEBUG LOGIN - Testing password verification with: ${testPassword}`);
        const isValid = await bcrypt.compare(testPassword, user.password_hash);
        console.log(`🐛 DEBUG LOGIN - Test password result: ${isValid}`);
        
        response.testPasswordResult = {
          testPassword,
          isValid,
        };
      } catch (error) {
        console.error(`🐛 DEBUG LOGIN - Password test error:`, error);
        response.testPasswordResult = {
          testPassword,
          isValid: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    return response;
  }
);
