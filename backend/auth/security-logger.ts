import { authDB } from "./db";

export interface SecurityEvent {
  event: string;
  email?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

// Log security events for audit trail
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  try {
    await authDB.exec`
      INSERT INTO security_logs (
        event_type,
        email,
        user_id,
        ip_address,
        user_agent,
        details,
        created_at
      ) VALUES (
        ${event.event},
        ${event.email || null},
        ${event.userId || null},
        ${event.ipAddress || null},
        ${event.userAgent || null},
        ${JSON.stringify(event.details || {})},
        NOW()
      )
    `;
    
    console.log(`Security event logged: ${event.event}`, {
      email: event.email,
      userId: event.userId,
      details: event.details
    });
  } catch (error) {
    // Don't fail the main operation if logging fails
    console.error("Failed to log security event:", error);
  }
}

// Get security events for a user (for admin purposes)
export async function getUserSecurityEvents(userId: string, limit: number = 50): Promise<any[]> {
  try {
    const events = await authDB.queryAll<{
      id: string;
      event_type: string;
      email: string | null;
      ip_address: string | null;
      user_agent: string | null;
      details: string;
      created_at: Date;
    }>`
      SELECT id, event_type, email, ip_address, user_agent, details, created_at
      FROM security_logs
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return events.map(event => ({
      id: event.id,
      eventType: event.event_type,
      email: event.email,
      ipAddress: event.ip_address,
      userAgent: event.user_agent,
      details: JSON.parse(event.details),
      createdAt: event.created_at
    }));
  } catch (error) {
    console.error("Failed to retrieve security events:", error);
    return [];
  }
}

// Get recent security events (for admin monitoring)
export async function getRecentSecurityEvents(limit: number = 100): Promise<any[]> {
  try {
    const events = await authDB.queryAll<{
      id: string;
      event_type: string;
      email: string | null;
      user_id: string | null;
      ip_address: string | null;
      user_agent: string | null;
      details: string;
      created_at: Date;
    }>`
      SELECT id, event_type, email, user_id, ip_address, user_agent, details, created_at
      FROM security_logs
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return events.map(event => ({
      id: event.id,
      eventType: event.event_type,
      email: event.email,
      userId: event.user_id,
      ipAddress: event.ip_address,
      userAgent: event.user_agent,
      details: JSON.parse(event.details),
      createdAt: event.created_at
    }));
  } catch (error) {
    console.error("Failed to retrieve recent security events:", error);
    return [];
  }
}
