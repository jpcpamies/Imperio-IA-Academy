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
    passwordHashFull?: string;
  };
  testPasswordResults?: Array<{
    testPassword: string;
    isValid: boolean;
    error?: string;
  }>;
  hashAnalysis?: {
    isValidBcryptFormat: boolean;
    saltRounds?: number;
    hashVersion?: string;
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
    console.log(`🐛 DEBUG LOGIN - Full password hash: ${user.password_hash}`);
    
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
        passwordHashFull: user.password_hash || undefined,
      },
    };

    // Analyze hash format
    if (user.password_hash) {
      const bcryptRegex = /^\$2[aby]?\$\d{1,2}\$.{53}$/;
      const isValidBcryptFormat = bcryptRegex.test(user.password_hash);
      
      let saltRounds: number | undefined;
      let hashVersion: string | undefined;
      
      if (isValidBcryptFormat) {
        const parts = user.password_hash.split('$');
        if (parts.length >= 4) {
          hashVersion = parts[1];
          saltRounds = parseInt(parts[2]);
        }
      }
      
      response.hashAnalysis = {
        isValidBcryptFormat,
        saltRounds,
        hashVersion,
      };
      
      console.log(`🐛 DEBUG LOGIN - Hash analysis:`, response.hashAnalysis);
    }

    // Test with multiple common passwords if hash exists
    if (user.password_hash) {
      const testPasswords = [
        '123456',
        'password', 
        'test123',
        req.email.split('@')[0], // username part of email
        user.name.toLowerCase().replace(/\s+/g, ''),
        'admin123',
        'user123',
        'qwerty',
        'password123',
        '12345678'
      ];
      
      response.testPasswordResults = [];
      
      for (const testPassword of testPasswords) {
        try {
          console.log(`🐛 DEBUG LOGIN - Testing password: "${testPassword}"`);
          const isValid = await bcrypt.compare(testPassword, user.password_hash);
          console.log(`🐛 DEBUG LOGIN - Test password "${testPassword}": ${isValid ? 'VALID' : 'INVALID'}`);
          
          response.testPasswordResults.push({
            testPassword,
            isValid,
          });
          
          if (isValid) {
            console.log(`🐛 DEBUG LOGIN - ✅ FOUND WORKING PASSWORD: "${testPassword}"`);
          }
        } catch (error) {
          console.error(`🐛 DEBUG LOGIN - Error testing "${testPassword}":`, error);
          response.testPasswordResults.push({
            testPassword,
            isValid: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }

    return response;
  }
);
