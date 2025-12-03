import api from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class AuthService {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/api/auth/sign', credentials);
      
      // Salva token e usuário no localStorage
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      // Extrai a mensagem de erro do backend silenciosamente
      let errorMessage = 'Erro ao fazer login. Tente novamente.';
      
      if (error.response) {
        // Erro com resposta do servidor
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 401) {
          errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
        } else if (error.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        }
      } else if (error.request) {
        // Erro de rede (sem resposta do servidor)
        errorMessage = 'Erro ao conectar com o servidor. Verifique sua conexão.';
      } else if (error.message && !error.message.includes('Request failed')) {
        // Erro na configuração da requisição (ignora mensagens genéricas do axios)
        errorMessage = error.message;
      }
      
      // Lança erro com a mensagem apropriada (sem logar no console)
      throw new Error(errorMessage);
    }
  }

  /**
   * Registra novo usuário
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>('/api/auth/register', data);
      return response.data;
    } catch (error: any) {
      // Extrai a mensagem de erro do backend silenciosamente
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      if (error.response) {
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 409) {
          errorMessage = 'Este email já está cadastrado.';
        } else if (error.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos.';
        } else if (error.response.status >= 500) {
          errorMessage = error.response.data?.error || 'Erro interno do servidor. Tente novamente mais tarde.';
        }
      } else if (error.request) {
        errorMessage = 'Erro ao conectar com o servidor. Verifique sua conexão.';
      } else if (error.message && !error.message.includes('Request failed')) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Busca perfil do usuário autenticado
   */
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/api/profile');
    return response.data;
  }

  /**
   * Atualiza perfil do usuário
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<User>('/api/profile', data);
    
    // Atualiza usuário no localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  }

  /**
   * Realiza logout
   */
  async logout(): Promise<void> {
    try {
      // Tenta fazer logout no servidor (opcional - não bloqueia se falhar)
      try {
        await api.post('/api/auth/logout');
      } catch (error) {
        // Ignora erros do servidor - logout no frontend deve sempre funcionar
        console.warn('Erro ao fazer logout no servidor (ignorado):', error);
      }
    } finally {
      // Sempre limpa dados locais, mesmo se a requisição falhar
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Verifica se há token salvo
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  /**
   * Obtém token do localStorage
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  /**
   * Obtém usuário do localStorage
   */
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();

