import { api } from "encore.dev/api";
import { authDB } from "./db";

export interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  services: {
    database: "healthy" | "unhealthy";
    authentication: "healthy" | "unhealthy";
  };
  details?: {
    database?: string;
    authentication?: string;
  };
}

// Health check endpoint for authentication service
export const healthCheck = api<void, HealthCheckResponse>(
  { expose: true, method: "GET", path: "/auth/health" },
  async () => {
    const timestamp = new Date().toISOString();
    let dbStatus: "healthy" | "unhealthy" = "healthy";
    let authStatus: "healthy" | "unhealthy" = "healthy";
    const details: { database?: string; authentication?: string } = {};

    // Check database connectivity
    try {
      await authDB.queryRow`SELECT 1 as test`;
      console.log("Database health check passed");
    } catch (error) {
      console.error("Database health check failed:", error);
      dbStatus = "unhealthy";
      details.database = error instanceof Error ? error.message : "Database connection failed";
    }

    // Check authentication service (basic functionality test)
    try {
      // Test that we can access the users table
      await authDB.queryRow`SELECT COUNT(*) as user_count FROM users LIMIT 1`;
      console.log("Authentication service health check passed");
    } catch (error) {
      console.error("Authentication service health check failed:", error);
      authStatus = "unhealthy";
      details.authentication = error instanceof Error ? error.message : "Authentication service error";
    }

    const overallStatus = dbStatus === "healthy" && authStatus === "healthy" ? "healthy" : "unhealthy";

    return {
      status: overallStatus,
      timestamp,
      services: {
        database: dbStatus,
        authentication: authStatus,
      },
      ...(Object.keys(details).length > 0 && { details }),
    };
  }
);
