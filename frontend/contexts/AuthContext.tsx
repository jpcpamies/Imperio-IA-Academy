import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

// Detectar si estamos en desarrollo local o en un entorno remoto
const getApiUrl = () => {
  // Si hay una variable de entorno configurada, usarla
  if (import.meta.env.VITE_CLIENT_TARGET) {
    return import.meta.env.VITE_CLIENT_TARGET;
  }
  
  // Si estamos en localhost, usar localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  
  // Si estamos en un entorno remoto, construir la URL basada en el hostname
  const hostname = window.location.hostname;
  // Reemplazar el puerto del frontend (5174) con el puerto del backend (4000)
  const backendHost = hostname.replace('5174', '4000');
  return `https://${backendHost}`;
};

const API_URL = getApiUrl();
console.log('API URL configurada:', API_URL);

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: string;
  emailVerified: boolean;
}

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
        
        const response = await axios.post(`${API_URL}/auth/verify-token`, { 
          token: sanitizedToken 
        });
        
        if (response.data.valid && response.data.user) {
          console.log("Token verification successful, user authenticated");
          setUser(response.data.user);
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
      
      const response = await axios.post(`${API_URL}/auth/login`, { 
        email, 
        password 
      });
      
      if (!response.data.success || !response.data.user || !response.data.token) {
        throw new Error("Invalid login response from server");
      }

      // Sanitize the token before storing
      const sanitizedToken = sanitizeToken(response.data.token);
      if (!sanitizedToken) {
        throw new Error("Invalid authentication token received");
      }

      console.log("Login successful, storing user data and token");
      
      setUser(response.data.user);
      localStorage.setItem("auth_token", sanitizedToken);
      
      console.log("User authenticated successfully:", response.data.user.email);
    } catch (error: any) {
      console.error("Login failed in auth context:", error);
      
      // Clear any potentially corrupted data
      setUser(null);
      localStorage.removeItem("auth_token");
      
      // Re-throw with a user-friendly message
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.message) {
        throw error;
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log("Attempting registration through auth context");
      
      const response = await axios.post(`${API_URL}/auth/register`, { 
        name, 
        email, 
        password 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error || "Registration failed");
      }
      
      console.log("Registration successful, attempting automatic login");
      
      // After successful registration, automatically log in
      await login(email, password);
      
      console.log("Auto-login after registration successful");
    } catch (error: any) {
      console.error("Registration failed in auth context:", error);
      
      // Clear any potentially corrupted data
      setUser(null);
      localStorage.removeItem("auth_token");
      
      // Re-throw with a user-friendly message
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.message) {
        throw error;
      } else {
        throw new Error("Registration failed. Please try again.");
      }
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
