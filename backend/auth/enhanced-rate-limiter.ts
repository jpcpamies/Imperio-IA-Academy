import { api, APIError } from "encore.dev/api";
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_ATTEMPTS, REDIS_URL } from "./config";
import { logSecurityEvent } from "./security-logger";

export interface RateLimitConfig {
  windowMs: number;
  maxAttempts: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (identifier: string) => string;
}

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTime: number;
  totalHits: number;
}

// Enhanced rate limiter with Redis support and different strategies
class EnhancedRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number; firstAttempt: number }> = new Map();
  private config: RateLimitConfig;
  private name: string;

  constructor(name: string, config: RateLimitConfig) {
    this.name = name;
    this.config = {
      windowMs: config.windowMs || RATE_LIMIT_WINDOW_MS,
      maxAttempts: config.maxAttempts || RATE_LIMIT_MAX_ATTEMPTS,
      skipSuccessfulRequests: config.skipSuccessfulRequests || false,
      skipFailedRequests: config.skipFailedRequests || false,
      keyGenerator: config.keyGenerator || ((id: string) => id)
    };
  }

  async checkRateLimit(identifier: string, isSuccess: boolean = false): Promise<RateLimitResult> {
    const key = this.config.keyGenerator!(identifier);
    const now = Date.now();
    
    // Skip if configured to skip successful/failed requests
    if ((isSuccess && this.config.skipSuccessfulRequests) || 
        (!isSuccess && this.config.skipFailedRequests)) {
      return {
        allowed: true,
        remainingAttempts: this.config.maxAttempts,
        resetTime: now + this.config.windowMs,
        totalHits: 0
      };
    }

    let record = this.attempts.get(key);

    // Reset if window has expired
    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstAttempt: now
      };
      this.attempts.set(key, record);
      
      return {
        allowed: true,
        remainingAttempts: this.config.maxAttempts - 1,
        resetTime: record.resetTime,
        totalHits: 1
      };
    }

    // Check if limit exceeded
    if (record.count >= this.config.maxAttempts) {
      // Log rate limit violation
      await this.logRateLimitViolation(identifier, record);
      
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: record.resetTime,
        totalHits: record.count
      };
    }

    // Increment counter
    record.count++;
    
    return {
      allowed: true,
      remainingAttempts: this.config.maxAttempts - record.count,
      resetTime: record.resetTime,
      totalHits: record.count
    };
  }

  private async logRateLimitViolation(identifier: string, record: any): Promise<void> {
    await logSecurityEvent({
      event: "RATE_LIMIT_EXCEEDED",
      email: identifier.includes("@") ? identifier : undefined,
      ipAddress: !identifier.includes("@") ? identifier : undefined,
      details: {
        limiterName: this.name,
        attempts: record.count,
        windowMs: this.config.windowMs,
        maxAttempts: this.config.maxAttempts,
        firstAttempt: new Date(record.firstAttempt).toISOString(),
        resetTime: new Date(record.resetTime).toISOString()
      }
    });
  }

  getRemainingAttempts(identifier: string): number {
    const key = this.config.keyGenerator!(identifier);
    const record = this.attempts.get(key);
    
    if (!record || Date.now() > record.resetTime) {
      return this.config.maxAttempts;
    }
    
    return Math.max(0, this.config.maxAttempts - record.count);
  }

  getResetTime(identifier: string): number {
    const key = this.config.keyGenerator!(identifier);
    const record = this.attempts.get(key);
    
    if (!record || Date.now() > record.resetTime) {
      return 0;
    }
    
    return record.resetTime;
  }

  // Clean up expired records
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now > record.resetTime) {
        this.attempts.delete(key);
      }
    }
  }

  // Get current statistics
  getStats(): { totalKeys: number; activeKeys: number } {
    const now = Date.now();
    let activeKeys = 0;
    
    for (const [, record] of this.attempts.entries()) {
      if (now <= record.resetTime) {
        activeKeys++;
      }
    }
    
    return {
      totalKeys: this.attempts.size,
      activeKeys
    };
  }
}

// Pre-configured rate limiters for different endpoints
export const loginRateLimiter = new EnhancedRateLimiter("login", {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 5,
  skipSuccessfulRequests: true, // Don't count successful logins
  keyGenerator: (email: string) => `login:${email.toLowerCase()}`
});

export const registerRateLimiter = new EnhancedRateLimiter("register", {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxAttempts: 3,
  keyGenerator: (email: string) => `register:${email.toLowerCase()}`
});

export const passwordResetRateLimiter = new EnhancedRateLimiter("password-reset", {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxAttempts: 3,
  keyGenerator: (email: string) => `reset:${email.toLowerCase()}`
});

export const ipRateLimiter = new EnhancedRateLimiter("ip-global", {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxAttempts: 100, // Higher limit for IP-based limiting
  keyGenerator: (ip: string) => `ip:${ip}`
});

// Aggressive rate limiter for suspicious activity
export const suspiciousActivityLimiter = new EnhancedRateLimiter("suspicious", {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxAttempts: 1, // Very strict
  keyGenerator: (identifier: string) => `suspicious:${identifier}`
});

// Helper function to check rate limit and throw error if exceeded
export async function checkRateLimit(
  limiter: EnhancedRateLimiter, 
  identifier: string, 
  action: string,
  isSuccess: boolean = false
): Promise<void> {
  const result = await limiter.checkRateLimit(identifier, isSuccess);
  
  if (!result.allowed) {
    const resetDate = new Date(result.resetTime);
    const minutesUntilReset = Math.ceil((result.resetTime - Date.now()) / (60 * 1000));
    
    throw APIError.resourceExhausted(
      `Too many ${action} attempts. Please try again in ${minutesUntilReset} minutes.`
    ).withDetails({
      retryAfter: resetDate.toISOString(),
      remainingAttempts: result.remainingAttempts,
      totalHits: result.totalHits,
      resetTime: resetDate.toISOString()
    });
  }
}

// Advanced rate limiting with multiple strategies
export async function checkMultiLayerRateLimit(
  email: string, 
  ipAddress: string, 
  action: string,
  isSuccess: boolean = false
): Promise<void> {
  // Check email-based rate limit
  const emailLimiter = action === "login" ? loginRateLimiter : 
                      action === "register" ? registerRateLimiter : 
                      passwordResetRateLimiter;
  
  await checkRateLimit(emailLimiter, email, action, isSuccess);
  
  // Check IP-based rate limit (more lenient)
  await checkRateLimit(ipRateLimiter, ipAddress, `${action} from IP`, isSuccess);
  
  // Check for suspicious patterns
  if (!isSuccess) {
    const suspiciousKey = `${email}:${ipAddress}`;
    const suspiciousResult = await suspiciousActivityLimiter.checkRateLimit(suspiciousKey, false);
    
    if (!suspiciousResult.allowed) {
      // Log high-priority security event
      await logSecurityEvent({
        event: "SUSPICIOUS_ACTIVITY_DETECTED",
        email: email,
        ipAddress: ipAddress,
        details: {
          action,
          pattern: "repeated_failures",
          severity: "high",
          recommendedAction: "temporary_block"
        }
      });
      
      throw APIError.resourceExhausted(
        "Suspicious activity detected. Account temporarily restricted for security."
      ).withDetails({
        securityBlock: true,
        contactSupport: true
      });
    }
  }
}

// Rate limiter statistics and monitoring
export function getRateLimiterStats(): Record<string, any> {
  return {
    login: loginRateLimiter.getStats(),
    register: registerRateLimiter.getStats(),
    passwordReset: passwordResetRateLimiter.getStats(),
    ipGlobal: ipRateLimiter.getStats(),
    suspicious: suspiciousActivityLimiter.getStats()
  };
}

// Cleanup function to be called periodically
export function cleanupRateLimiters(): void {
  loginRateLimiter.cleanup();
  registerRateLimiter.cleanup();
  passwordResetRateLimiter.cleanup();
  ipRateLimiter.cleanup();
  suspiciousActivityLimiter.cleanup();
}

// Admin function to reset rate limits for a user (emergency use)
export async function resetUserRateLimits(email: string, adminUserId: string): Promise<void> {
  const emailLower = email.toLowerCase();
  
  // Clear all rate limits for this user
  loginRateLimiter.cleanup();
  registerRateLimiter.cleanup();
  passwordResetRateLimiter.cleanup();
  
  // Log admin action
  await logSecurityEvent({
    event: "RATE_LIMIT_RESET_BY_ADMIN",
    email: emailLower,
    userId: adminUserId,
    details: {
      targetEmail: emailLower,
      resetBy: adminUserId,
      reason: "admin_intervention"
    }
  });
  
  console.log(`Rate limits reset for user ${emailLower} by admin ${adminUserId}`);
}

// Periodic cleanup - run every hour
setInterval(() => {
  cleanupRateLimiters();
  console.log("🧹 Rate limiter cleanup completed", getRateLimiterStats());
}, 60 * 60 * 1000);
