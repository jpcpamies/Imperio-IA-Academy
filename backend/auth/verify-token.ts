import { api, APIError } from "encore.dev/api";
import { authDB } from "./db";
import jwt from "jsonwebtoken";
import { getJWTSecret } from "./config";

export interface VerifyTokenRequest {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  emailVerified: boolean;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user?: User;
}

// Helper function to sanitize token
function sanitizeToken(token: string): string {
  if (!token || typeof token !== 'string') {
    return '';
  }
  
  // Remove all whitespace and invisible characters
  return token
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .replace(/\s+/g, ''); // Remove all whitespace
}

// Verifies a JWT token and returns user information.
export const verifyToken = api<VerifyTokenRequest, VerifyTokenResponse>(
  { expose: true, method: "POST", path: "/auth/verify-token" },
  async (req) => {
    console.log("Token verification attempt started");

    const sanitizedToken = sanitizeToken(req.token);
    
    if (!sanitizedToken) {
      console.log("No token provided or token is empty");
      return { valid: false };
    }

    console.log("Token length:", sanitizedToken.length);

    let decoded;
    try {
      // Verify JWT token with enhanced validation
      decoded = jwt.verify(sanitizedToken, getJWTSecret(), {
        issuer: 'ai-academia',
        audience: 'ai-academia-users',
        algorithms: ['HS256']
      }) as {
        userId: string;
        email: string;
        role: string;
        iat: number;
        exp: number;
      };
      
      console.log("Token decoded successfully for user:", decoded.userId);
    } catch (jwtError) {
      console.log("JWT verification failed:", jwtError instanceof Error ? jwtError.message : 'Unknown error');
      return { valid: false };
    }

    // Validate decoded token structure
    if (!decoded.userId || !decoded.email || !decoded.role) {
      console.log("Invalid token structure - missing required fields");
      return { valid: false };
    }

    let user;
    try {
      // Get current user data from database with retry logic
      console.log("Fetching user data for ID:", decoded.userId);
      
      user = await authDB.queryRow<{
        id: string;
        email: string;
        name: string;
        avatar_url: string | null;
        role: string;
        email_verified: boolean;
      }>`
        SELECT id, email, name, avatar_url, role, email_verified
        FROM users 
        WHERE id = ${decoded.userId}
      `;
      
      console.log("User data fetch completed, user found:", !!user);
    } catch (dbError) {
      console.error("Database error during user fetch:", dbError);
      return { valid: false };
    }

    if (!user) {
      console.log("User not found in database for ID:", decoded.userId);
      return { valid: false };
    }

    // Verify that the token email matches the current user email
    if (user.email.toLowerCase() !== decoded.email.toLowerCase()) {
      console.log("Token email mismatch - token may be stale");
      return { valid: false };
    }

    // Verify that the user's email is still verified
    if (!user.email_verified) {
      console.log("User email is no longer verified");
      return { valid: false };
    }

    console.log("Token verification successful for user:", user.id);

    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatar_url,
        role: user.role,
        emailVerified: user.email_verified,
      },
    };
  }
);
