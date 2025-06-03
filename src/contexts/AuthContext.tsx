import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { authService, AuthError } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  unregister: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const login = async (username: string, password: string) => {
    try {
      clearError();
      await authService.login(username, password);
      setIsAuthenticated(true);
      setUsername(username);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      clearError();
      await authService.register(username, password);
      setIsAuthenticated(true);
      setUsername(username);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    }
  };

  const unregister = async (username: string, password: string) => {
    try {
      clearError();
      await authService.unregister(username, password);
      setIsAuthenticated(false);
      setUsername(null);
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    clearError();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        error,
        login,
        register,
        unregister,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 