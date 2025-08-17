import { api } from "encore.dev/api";
import { authDB } from "./db";
import { testEmailService } from "./email-service";
import { 
  NODE_ENV, 
  validateProductionConfig,
  logConfiguration 
} from "./config";

interface MemoryUsage {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  environment: string;
  version: string;
  services: {
    database: ServiceStatus;
    authentication: ServiceStatus;
    email: ServiceStatus;
    configuration: ServiceStatus;
  };
  metrics: {
    uptime: number;
    memoryUsage: MemoryUsage;
    databaseConnections: number;
  };
  details?: Record<string, any>;
}

export interface ServiceStatus {
  status: "healthy" | "degraded" | "unhealthy";
  responseTime?: number;
  lastCheck: string;
  error?: string;
  details?: Record<string, any>;
}

export interface SecurityMetrics {
  failedLogins: number;
  rateLimitViolations: number;
  suspiciousActivity: number;
  passwordResets: number;
  newRegistrations: number;
  timeRange: string;
}

// Track service start time for uptime calculation
const startTime = Date.now();

// Enhanced health check with comprehensive monitoring
export const healthCheck = api<void, HealthCheckResponse>(
  { expose: true, method: "GET", path: "/auth/health" },
  async () => {
    const timestamp = new Date().toISOString();
    
    // Check all services
    const [
      databaseStatus,
      authStatus,
      emailStatus,
      configStatus
    ] = await Promise.all([
      checkDatabaseHealth(),
      checkAuthenticationHealth(),
      checkEmailHealth(),
      checkConfigurationHealth()
    ]);

    // Calculate overall status
    const services = {
      database: databaseStatus,
      authentication: authStatus,
      email: emailStatus,
      configuration: configStatus
    };

    const overallStatus = calculateOverallStatus(services);
    
    // Gather metrics
    const metrics = await gatherMetrics();
    
    const response: HealthCheckResponse = {
      status: overallStatus,
      timestamp,
      environment: NODE_ENV,
      version: "1.0.0", // You might want to get this from package.json
      services,
      metrics,
      ...(overallStatus !== "healthy" && { 
        details: gatherErrorDetails(services) 
      })
    };

    // Log health check if there are issues
    if (overallStatus !== "healthy") {
      console.warn("🚨 Health check detected issues:", {
        status: overallStatus,
        services: Object.entries(services)
          .filter(([, service]) => service.status !== "healthy")
          .map(([name, service]) => ({ name, status: service.status, error: service.error }))
      });
    }

    return response;
  }
);

// Security metrics endpoint for monitoring
export const securityMetrics = api<void, SecurityMetrics>(
  { expose: true, method: "GET", path: "/auth/security-metrics" },
  async () => {
    const timeRange = "24h";
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
      const metrics = await authDB.queryRow<{
        failed_logins: number;
        rate_limit_violations: number;
        suspicious_activity: number;
        password_resets: number;
        new_registrations: number;
      }>`
        SELECT 
          COUNT(CASE WHEN event_type = 'LOGIN_FAILED' THEN 1 END) as failed_logins,
          COUNT(CASE WHEN event_type = 'RATE_LIMIT_EXCEEDED' THEN 1 END) as rate_limit_violations,
          COUNT(CASE WHEN event_type = 'SUSPICIOUS_ACTIVITY_DETECTED' THEN 1 END) as suspicious_activity,
          COUNT(CASE WHEN event_type = 'PASSWORD_RESET_REQUESTED' THEN 1 END) as password_resets,
          COUNT(CASE WHEN event_type = 'REGISTRATION_SUCCESS' THEN 1 END) as new_registrations
        FROM security_logs 
        WHERE created_at >= ${since}
      `;

      return {
        failedLogins: metrics?.failed_logins || 0,
        rateLimitViolations: metrics?.rate_limit_violations || 0,
        suspiciousActivity: metrics?.suspicious_activity || 0,
        passwordResets: metrics?.password_resets || 0,
        newRegistrations: metrics?.new_registrations || 0,
        timeRange
      };
    } catch (error) {
      console.error("Failed to gather security metrics:", error);
      return {
        failedLogins: 0,
        rateLimitViolations: 0,
        suspiciousActivity: 0,
        passwordResets: 0,
        newRegistrations: 0,
        timeRange
      };
    }
  }
);

// Individual health check functions
async function checkDatabaseHealth(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    await authDB.queryRow`SELECT 1 as test`;
    
    const userCount = await authDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM users LIMIT 1
    `;
    
    const logCount = await authDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM security_logs LIMIT 1
    `;

    return {
      status: "healthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      details: {
        userTableAccessible: true,
        securityLogsAccessible: true,
        userCount: userCount?.count || 0,
        logCount: logCount?.count || 0
      }
    };
  } catch (error) {
    return {
      status: "unhealthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Database connection failed",
      details: { connectionFailed: true }
    };
  }
}

async function checkAuthenticationHealth(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    const recentLogins = await authDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count 
      FROM security_logs 
      WHERE event_type = 'LOGIN_SUCCESS' 
      AND created_at >= NOW() - INTERVAL '1 hour'
    `;

    const recentFailures = await authDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count 
      FROM security_logs 
      WHERE event_type = 'LOGIN_FAILED' 
      AND created_at >= NOW() - INTERVAL '1 hour'
    `;

    const failureRate = recentFailures && recentLogins ? 
      (recentFailures.count / Math.max(recentLogins.count + recentFailures.count, 1)) : 0;

    const status = failureRate > 0.5 ? "degraded" : "healthy";

    return {
      status,
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      details: {
        recentLogins: recentLogins?.count || 0,
        recentFailures: recentFailures?.count || 0,
        failureRate: Math.round(failureRate * 100) / 100
      }
    };
  } catch (error) {
    return {
      status: "unhealthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Authentication check failed"
    };
  }
}

async function checkEmailHealth(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    const emailTest = await testEmailService();
    
    return {
      status: emailTest.success ? "healthy" : "degraded",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      ...(emailTest.error && { error: emailTest.error }),
      details: {
        serviceConfigured: emailTest.success,
        provider: process.env.EMAIL_SERVICE_PROVIDER || "mock"
      }
    };
  } catch (error) {
    return {
      status: "unhealthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Email service check failed"
    };
  }
}

async function checkConfigurationHealth(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    const validation = validateProductionConfig();
    
    return {
      status: validation.isValid ? "healthy" : "unhealthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      ...(validation.errors.length > 0 && { 
        error: `Configuration errors: ${validation.errors.join(", ")}` 
      }),
      details: {
        environment: NODE_ENV,
        configurationValid: validation.isValid,
        errorCount: validation.errors.length
      }
    };
  } catch (error) {
    return {
      status: "unhealthy",
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Configuration check failed"
    };
  }
}

function calculateOverallStatus(services: Record<string, ServiceStatus>): "healthy" | "degraded" | "unhealthy" {
  const statuses = Object.values(services).map(service => service.status);
  
  if (statuses.some(status => status === "unhealthy")) {
    return "unhealthy";
  }
  
  if (statuses.some(status => status === "degraded")) {
    return "degraded";
  }
  
  return "healthy";
}

function gatherErrorDetails(services: Record<string, ServiceStatus>): Record<string, any> {
  const errors: Record<string, any> = {};
  
  for (const [name, service] of Object.entries(services)) {
    if (service.status !== "healthy") {
      errors[name] = {
        status: service.status,
        error: service.error,
        details: service.details
      };
    }
  }
  
  return errors;
}

async function gatherMetrics(): Promise<HealthCheckResponse["metrics"]> {
  try {
    const dbConnections = await authDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM pg_stat_activity WHERE state = 'active'
    `;

    return {
      uptime: Date.now() - startTime,
      memoryUsage: process.memoryUsage(),
      databaseConnections: dbConnections?.count || 0
    };
  } catch (error) {
    console.error("Failed to gather metrics:", error);
    return {
      uptime: Date.now() - startTime,
      memoryUsage: process.memoryUsage(),
      databaseConnections: 0
    };
  }
}

// Initialize monitoring on startup
export function initializeMonitoring(): void {
  console.log("🔍 Initializing authentication monitoring...");
  
  logConfiguration();
  
  setInterval(async () => {
    try {
      const health = await healthCheck.handler();
      if (health.status !== "healthy") {
        console.warn("⚠️ Periodic health check detected issues:", {
          status: health.status,
          timestamp: health.timestamp,
          issues: health.details
        });
      }
    } catch (error) {
      console.error("❌ Periodic health check failed:", error);
    }
  }, 5 * 60 * 1000);
  
  setInterval(async () => {
    try {
      const metrics = await securityMetrics.handler();
      
      if (metrics.failedLogins > 100) {
        console.warn("🚨 High number of failed logins detected:", metrics.failedLogins);
      }
      
      if (metrics.rateLimitViolations > 50) {
        console.warn("🚨 High number of rate limit violations:", metrics.rateLimitViolations);
      }
      
      if (metrics.suspiciousActivity > 10) {
        console.warn("🚨 Suspicious activity detected:", metrics.suspiciousActivity);
      }
      
      console.log("📊 Security metrics (24h):", metrics);
    } catch (error) {
      console.error("❌ Security metrics collection failed:", error);
    }
  }, 60 * 60 * 1000);
  
  console.log("✅ Authentication monitoring initialized");
}

// Call on service startup
initializeMonitoring();
