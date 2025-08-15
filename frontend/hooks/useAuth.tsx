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
      const userInfo = await backend.auth.me();
      setUser(userInfo);
    } catch (error) {
      setUser(null);
      // Clear any stored auth data on auth check failure
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    
    // Clear sessionStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('session');
    
    // Note: HTTP-only cookies are automatically cleared by the server response
    console.log(`🔐 AUTH - Cleared local authentication data`);
  };

  const login = async (email: string, password: string) => {
    const response = await backend.auth.login({ email, password });
    setUser(response.user);
    console.log(`🔐 AUTH - User logged in: ${response.user.email}`);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await backend.auth.register({ email, password, name });
    setUser(response.user);
    console.log(`🔐 AUTH - User registered: ${response.user.email}`);
  };

  const logout = async () => {
    try {
      console.log(`🔐 AUTH - Starting logout process for user: ${user?.email}`);
      
      // Call backend logout to clear server-side session
      await backend.auth.logout();
      console.log(`🔐 AUTH - Server logout successful`);
      
      // Clear local user state
      setUser(null);
      
      // Clear any stored authentication data
      clearAuthData();
      
      console.log(`🔐 AUTH - Logout completed successfully`);
    } catch (error) {
      console.error(`🔐 AUTH - Logout error:`, error);
      
      // Even if server logout fails, clear local state for security
      setUser(null);
      clearAuthData();
      
      console.log(`🔐 AUTH - Local logout completed despite server error`);
    }
  };

  const updateProfile = async (name: string) => {
    const response = await backend.auth.updateProfile({ name });
    setUser(prev => prev ? { ...prev, name: response.user.name } : null);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await backend.auth.changePassword({ currentPassword, newPassword });
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
