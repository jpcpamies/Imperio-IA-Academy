import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import backend from "~backend/client";
import type { UserInfo } from "~backend/auth/me";

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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
      console.log(`🔐 AUTH PROVIDER - Checking authentication status...`);
      const userInfo = await backend.auth.me();
      console.log(`🔐 AUTH PROVIDER - User authenticated:`, userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log(`🔐 AUTH PROVIDER - No authenticated user found`);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log(`🔐 AUTH PROVIDER - Login attempt for: ${email}`);
    const response = await backend.auth.login({ email, password });
    console.log(`🔐 AUTH PROVIDER - Login successful for: ${email}`);
    setUser(response.user);
  };

  const register = async (email: string, password: string, name: string) => {
    console.log(`🔐 AUTH PROVIDER - Registration attempt for: ${email}`);
    const response = await backend.auth.register({ email, password, name });
    console.log(`🔐 AUTH PROVIDER - Registration successful for: ${email}`);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      console.log(`🔐 AUTH PROVIDER - Logout attempt...`);
      await backend.auth.logout();
      console.log(`🔐 AUTH PROVIDER - Server logout successful`);
    } catch (error) {
      console.log(`🔐 AUTH PROVIDER - Server logout failed, clearing local state anyway`);
    } finally {
      setUser(null);
      console.log(`🔐 AUTH PROVIDER - Local state cleared`);
    }
  };

  const updateProfile = async (name: string) => {
    console.log(`🔐 AUTH PROVIDER - Profile update attempt...`);
    const response = await backend.auth.updateProfile({ name });
    setUser(prev => prev ? { ...prev, name: response.user.name } : null);
    console.log(`🔐 AUTH PROVIDER - Profile updated successfully`);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    console.log(`🔐 AUTH PROVIDER - Password change attempt...`);
    await backend.auth.changePassword({ currentPassword, newPassword });
    console.log(`🔐 AUTH PROVIDER - Password changed successfully`);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
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
