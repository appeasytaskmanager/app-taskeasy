"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verifica autenticação ao montar o componente
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Primeiro tenta obter do localStorage (mais rápido)
      const storedUser = authService.getUser();
      const token = authService.getToken();

      if (storedUser && token) {
        setUser(storedUser);
        
        // Valida token fazendo requisição ao backend
        try {
          const profile = await authService.getProfile();
          setUser(profile);
          // Atualiza localStorage com dados mais recentes
          localStorage.setItem('user', JSON.stringify(profile));
        } catch (error) {
          // Token inválido, limpa tudo
          authService.logout();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      router.push('/dashboard');
    } catch (error: any) {
      // O authService já trata o erro e lança com mensagem apropriada
      // Apenas propaga o erro com a mensagem
      const errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await authService.register({ name, email, password });
      // Após registro, faz login automaticamente
      await login(email, password);
    } catch (error: any) {
      // O authService já trata o erro e lança com mensagem apropriada
      // Apenas propaga o erro com a mensagem
      const errorMessage = error.message || 'Erro ao criar conta. Tente novamente.';
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/auth/login');
  };

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      // Se falhar, pode ser que o token expirou
      authService.logout();
      setUser(null);
      router.push('/auth/login');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

