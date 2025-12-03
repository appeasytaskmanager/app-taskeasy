import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Função para obter a baseURL correta
function getBaseURL(): string {
  // No servidor (SSR), não tem window
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }
  
  // No cliente, use a origem atual (funciona em qualquer domínio)
  return window.location.origin;
}

// Configuração base do axios
const api: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos (aumentado para Vercel cold starts)
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Não adiciona token em rotas de autenticação (login e registro)
    const isAuthRoute = config.url?.includes('/auth/sign') || config.url?.includes('/auth/register');
    
    if (!isAuthRoute) {
      // Busca o token do localStorage apenas para rotas autenticadas
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Se receber 401 (não autorizado), limpa o token e redireciona para login
    // MAS apenas se não estiver na página de login/register (evita loop)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.includes('/auth/login') || currentPath.includes('/auth/register');
        
        // Só redireciona se não estiver em página de autenticação
        // E se a requisição não for de login/register (evita redirecionar durante login com credenciais erradas)
        const isAuthRequest = error.config?.url?.includes('/auth/sign') || error.config?.url?.includes('/auth/register');
        
        if (!isAuthPage && !isAuthRequest) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Usa replace ao invés de href para evitar refresh desnecessário
          window.location.replace('/auth/login');
        }
      }
    }
    
    // Rejeita o erro silenciosamente (sem logar no console)
    // O erro será tratado no catch do componente/serviço
    return Promise.reject(error);
  }
);

export default api;
