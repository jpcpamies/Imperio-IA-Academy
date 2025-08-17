import React, { createContext, useContext, useEffect, useState } from "react";
import backend from "~backend/client";
import type { User } from "~backend/auth/login";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // Helper function to sanitize token
  const sanitizeToken = (token: string): string => {
    if (!token || typeof token !== 'string') {
      return '';
    }
    
    // Remove all whitespace and invisible characters
    return token
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
      .replace(/\s+/g, ''); // Remove all whitespace
  };

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("auth_token");
        if (!storedToken) {
          setLoading(false);
          return;
        }

        const sanitizedToken = sanitizeToken(storedToken);
        if (!sanitizedToken) {
          console.log("Invalid token format, removing from storage");
          localStorage.removeItem("auth_token");
          setLoading(false);
          return;
        }

        console.log("Verifying stored authentication token");
        
        const response = await backend.auth.verifyToken({ token: sanitizedToken });
        
        if (response.valid && response.user) {
          console.log("Token verification successful, user authenticated");
          setUser(response.user);
        } else {
          console.log("Token verification failed, removing from storage");
          localStorage.removeItem("auth_token");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login through auth context");
      
      const response = await backend.auth.login({ email, password });
      
      if (!response.success || !response.user || !response.token) {
        throw new Error("Invalid login response from server");
      }

      // Sanitize the token before storing
      const sanitizedToken = sanitizeToken(response.token);
      if (!sanitizedToken) {
        throw new Error("Invalid authentication token received");
      }

      console.log("Login successful, storing user data and token");
      
      setUser(response.user);
      localStorage.setItem("auth_token", sanitizedToken);
      
      console.log("User authenticated successfully:", response.user.email);
    } catch (error) {
      console.error("Login failed in auth context:", error);
      
      // Clear any potentially corrupted data
      setUser(null);
      localStorage.removeItem("auth_token");
      
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log("Attempting registration through auth context");
      
      await backend.auth.register({ name, email, password });
      
      console.log("Registration successful, attempting automatic login");
      
      // After successful registration, automatically log in
      await login(email, password);
      
      console.log("Auto-login after registration successful");
    } catch (error) {
      console.error("Registration failed in auth context:", error);
      
      // Clear any potentially corrupted data
      setUser(null);
      localStorage.removeItem("auth_token");
      
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out user");
    
    setUser(null);
    localStorage.removeItem("auth_token");
    
    // Clear any other auth-related data that might be stored
    sessionStorage.clear();
    
    console.log("User logged out successfully");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
