import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import backend from "~backend/client";
import type { UserInfo } from "~backend/auth/me";

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userInfo = await backend.auth.me();
      setUser(userInfo);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await backend.auth.login({ email, password });
    setUser(response.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await backend.auth.register({ email, password, name });
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await backend.auth.logout();
    } catch (error) {
      // Even if server logout fails, clear local state
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
