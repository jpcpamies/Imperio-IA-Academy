import { api, Cookie } from "encore.dev/api";

export interface LogoutResponse {
  session: Cookie<"session">;
  success: boolean;
}

export const logout = api<void, LogoutResponse>(
  { expose: true, method: "POST", path: "/auth/logout" },
  async () => {
    try {
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
    } catch (error) {
      console.error("Logout error:", error);
      
      // Even if there's an error, we should still clear the session
      return {
        success: true,
        session: {
          value: "",
          expires: new Date(0),
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        },
      };
    }
  }
);
