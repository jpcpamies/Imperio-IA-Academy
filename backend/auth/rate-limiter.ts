import { api, APIError } from "encore.dev/api";

// Simple in-memory rate limiter for authentication endpoints
// In production, use Redis or a proper rate limiting service
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return this.maxAttempts;
    }
    return Math.max(0, this.maxAttempts - record.count);
  }

  getResetTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return 0;
    }
    return record.resetTime;
  }

  // Clean up expired records periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now > record.resetTime) {
        this.attempts.delete(key);
      }
    }
  }
}

// Create rate limiter instances for different endpoints
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const registerRateLimiter = new RateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour

// Helper function to check rate limit and throw error if exceeded
export function checkRateLimit(limiter: RateLimiter, identifier: string, action: string): void {
  if (!limiter.checkRateLimit(identifier)) {
    const resetTime = limiter.getResetTime(identifier);
    const resetDate = new Date(resetTime);
    const minutesUntilReset = Math.ceil((resetTime - Date.now()) / (60 * 1000));
    
    throw APIError.resourceExhausted(
      `Too many ${action} attempts. Please try again in ${minutesUntilReset} minutes.`
    ).withDetails({
      retryAfter: resetDate.toISOString(),
      remainingAttempts: 0
    });
  }
}

// Cleanup expired records every hour
setInterval(() => {
  loginRateLimiter.cleanup();
  registerRateLimiter.cleanup();
}, 60 * 60 * 1000);
