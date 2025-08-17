import { secret } from "encore.dev/config";

// JWT Configuration
export const jwtSecret = secret("JWTSecret");
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "7d";
export const JWT_ISSUER = process.env.JWT_ISSUER || "ai-academia";
export const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "ai-academia-users";

// Database Configuration
export const DATABASE_POOL_SIZE = parseInt(process.env.DATABASE_POOL_SIZE || "20");
export const DATABASE_TIMEOUT = parseInt(process.env.DATABASE_TIMEOUT || "30000");

// Email Configuration
export const EMAIL_SERVICE_PROVIDER = process.env.EMAIL_SERVICE_PROVIDER || "sendgrid";
export const emailApiKey = secret("EmailApiKey");
export const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "noreply@aiacademia.com";
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "AI Academia";
export const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || "support@aiacademia.com";

// CORS and Security
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [CORS_ORIGIN];

// Rate Limiting Configuration
export const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"); // 15 minutes
export const RATE_LIMIT_MAX_ATTEMPTS = parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || "5");
export const REDIS_URL = process.env.REDIS_URL;

// Security Configuration
export const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12");
export const SESSION_TIMEOUT = parseInt(process.env.SESSION_TIMEOUT || "86400000"); // 24 hours
export const COOKIE_SECURE = process.env.COOKIE_SECURE === "true" || process.env.NODE_ENV === "production";
export const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || "strict";

// Monitoring Configuration
export const HEALTH_CHECK_INTERVAL = parseInt(process.env.HEALTH_CHECK_INTERVAL || "30000");
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const ENABLE_SECURITY_LOGGING = process.env.ENABLE_SECURITY_LOGGING === "true" || true;

// Application Configuration
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = parseInt(process.env.PORT || "4000");

// Production validation
export function validateProductionConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (NODE_ENV === "production") {
    // Critical production checks
    if (!jwtSecret()) {
      errors.push("JWT_SECRET must be set in production");
    }

    if (!process.env.DATABASE_URL) {
      errors.push("DATABASE_URL must be set in production");
    }

    if (!emailApiKey()) {
      errors.push("EMAIL_API_KEY must be set in production");
    }

    if (CORS_ORIGIN.includes("localhost")) {
      errors.push("CORS_ORIGIN should not include localhost in production");
    }

    if (!COOKIE_SECURE) {
      errors.push("COOKIE_SECURE should be true in production");
    }

    // Security checks
    if (BCRYPT_ROUNDS < 12) {
      errors.push("BCRYPT_ROUNDS should be at least 12 in production");
    }

    // JWT secret strength check
    try {
      const secret = jwtSecret();
      if (secret.length < 32) {
        errors.push("JWT_SECRET should be at least 32 characters long");
      }
    } catch (error) {
      errors.push("JWT_SECRET is not accessible");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Log configuration on startup
export function logConfiguration(): void {
  console.log("🔧 Authentication Configuration:");
  console.log(`  Environment: ${NODE_ENV}`);
  console.log(`  JWT Expiration: ${JWT_EXPIRATION}`);
  console.log(`  CORS Origin: ${CORS_ORIGIN}`);
  console.log(`  Email Provider: ${EMAIL_SERVICE_PROVIDER}`);
  console.log(`  Rate Limit Window: ${RATE_LIMIT_WINDOW_MS}ms`);
  console.log(`  Rate Limit Max Attempts: ${RATE_LIMIT_MAX_ATTEMPTS}`);
  console.log(`  BCrypt Rounds: ${BCRYPT_ROUNDS}`);
  console.log(`  Cookie Secure: ${COOKIE_SECURE}`);
  console.log(`  Security Logging: ${ENABLE_SECURITY_LOGGING}`);

  // Validate production configuration
  const validation = validateProductionConfig();
  if (!validation.isValid) {
    console.error("❌ Production Configuration Errors:");
    validation.errors.forEach(error => console.error(`  - ${error}`));
    if (NODE_ENV === "production") {
      throw new Error("Invalid production configuration");
    }
  } else {
    console.log("✅ Configuration validation passed");
  }
}
