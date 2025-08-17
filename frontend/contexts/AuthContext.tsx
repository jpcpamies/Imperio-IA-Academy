import React, { createContext, useState, useEffect, ReactNode } from 'react';
import backend from '~backend/client';
import type { User } from '~backend/auth/login';
import type { LoginRequest } from '~backend/auth/login';
import type { RegisterRequest } from '~backend/auth/register';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (details: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const { valid, user: verifiedUser } = await backend.auth.verifyToken({ token: storedToken });
          if (valid && verifiedUser) {
            setToken(storedToken);
            setUser(verifiedUser);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error("Token verification failed", error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const { user, token } = await backend.auth.login(credentials);
    localStorage.setItem('authToken', token);
    setToken(token);
    setUser(user);
  };

  const register = async (details: RegisterRequest) => {
    await backend.auth.register(details);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
