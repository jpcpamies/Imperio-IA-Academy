import { api, Cookie } from "encore.dev/api";

export interface LogoutResponse {
  session: Cookie<"session">;
  success: boolean;
}

// Logs out the current user by clearing the session.
export const logout = api<void, LogoutResponse>(
  { expose: true, method: "POST", path: "/auth/logout" },
  async () => {
    console.log(`🔐 LOGOUT - Processing logout request`);
    
    return {
      success: true,
      session: {
        value: "",
        expires: new Date(0), // Expire immediately
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      },
    };
  }
);
