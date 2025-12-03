import api from '@/lib/api';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  userId: string;
  categoryId: string;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updateAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  priority?: "low" | "medium" | "high";
  categoryId: string;
  dueDate?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  priority?: "low" | "medium" | "high";
  categoryId?: string;
  dueDate?: string;
}

class TaskService {
  /**
   * Lista todas as tarefas do usuário autenticado
   */
  async getTasks(filters?: Record<string, string>): Promise<Task[]> {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get<Task[]>(`/api/tasks?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tarefas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar tarefas.');
    }
  }

  /**
   * Busca uma tarefa específica por ID
   */
  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get<Task>(`/api/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao buscar tarefa.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Cria uma nova tarefa
   */
  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await api.post<Task>('/api/tasks', data);
      return response.data;
    } catch (error: any) {
      // Extrai mensagem de erro do backend
      let errorMessage = 'Erro ao criar tarefa. Tente novamente.';
      
      if (error.response) {
        if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos.';
        } else if (error.response.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
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
   * Atualiza uma tarefa existente
   */
  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await api.patch<Task>(`/api/tasks/${id}`, data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar tarefa.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Deleta uma tarefa
   */
  async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/api/tasks/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao deletar tarefa.';
      throw new Error(errorMessage);
    }
  }

  /**
   * Lista todas as categorias disponíveis
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>('/api/categories');
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar categorias:', error);
      // Retorna array vazio se falhar (não bloqueia criação de tarefa)
      return [];
    }
  }

  /**
   * Cria uma nova categoria
   */
  async createCategory(name: string): Promise<Category> {
    try {
      const response = await api.post<Category>('/api/categories', { name });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar categoria.';
      throw new Error(errorMessage);
    }
  }
}

export const taskService = new TaskService();

