"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService, Task, Category, CreateTaskData, UpdateTaskData } from "@/services/task.service";

// Re-exporta tipos para uso em outros componentes
export type { Task, Category, CreateTaskData, UpdateTaskData };

export interface UseTasksReturn {
  tasks: Task[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => void;
  createTask: (task: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, task: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  searchTasks: (query: string) => Task[];
  fetchCategories: () => void;
}

export function useTasks(): UseTasksReturn {
  const queryClient = useQueryClient();

  // Query para buscar tarefas
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await taskService.getTasks();
      console.log("📋 Tarefas buscadas:", data.length, "tarefas");
      return data;
    },
    staleTime: 0, // Sempre considerar dados como stale
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Query para buscar categorias
  const {
    data: categories = [],
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const cats = await taskService.getCategories();
        
        // Se não houver categorias, cria uma padrão para o usuário
        if (cats.length === 0) {
          try {
            const defaultCat = await taskService.createCategory("Geral");
            return [defaultCat];
          } catch (createErr) {
            console.error("Erro ao criar categoria padrão:", createErr);
            return [];
          }
        }
        
        return cats;
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: false, // Não re-buscar ao montar
    refetchOnWindowFocus: false, // Não re-buscar ao focar janela
  });

  // Mutation para criar tarefa
  const createTaskMutation = useMutation({
    mutationFn: async (task: CreateTaskData) => {
      console.log("🚀 Criando tarefa:", task);
      const newTask = await taskService.createTask(task);
      console.log("✅ Tarefa criada:", newTask);
      return newTask;
    },
    onSuccess: () => {
      // Invalida e re-busca as tarefas automaticamente
      console.log("🔄 Invalidando cache de tarefas...");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      console.error("❌ Erro ao criar tarefa:", error);
    },
  });

  // Mutation para atualizar tarefa
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateTaskData }) => {
      console.log("🔄 Atualizando tarefa:", id, updates);
      const updated = await taskService.updateTask(id, updates);
      console.log("✅ Tarefa atualizada:", updated);
      return updated;
    },
    onSuccess: () => {
      // Invalida e re-busca as tarefas automaticamente
      console.log("🔄 Invalidando cache de tarefas...");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      console.error("❌ Erro ao atualizar tarefa:", error);
    },
  });

  // Mutation para deletar tarefa
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log("🗑️ Deletando tarefa:", id);
      await taskService.deleteTask(id);
      console.log("✅ Tarefa deletada");
    },
    onSuccess: () => {
      // Invalida e re-busca as tarefas automaticamente
      console.log("🔄 Invalidando cache de tarefas...");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      console.error("❌ Erro ao deletar tarefa:", error);
    },
  });

  // Busca tarefas por query (local)
  const searchTasks = (query: string) => {
    const tasksList = Array.isArray(tasks) ? tasks : [];
    if (!query.trim()) return tasksList;
    return tasksList.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description?.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    tasks,
    categories,
    loading: tasksLoading,
    error: tasksError ? (tasksError as Error).message : null,
    fetchTasks: () => refetchTasks(),
    createTask: async (task: CreateTaskData) => {
      return createTaskMutation.mutateAsync(task);
    },
    updateTask: async (id: string, updates: UpdateTaskData) => {
      await updateTaskMutation.mutateAsync({ id, updates });
    },
    deleteTask: async (id: string) => {
      await deleteTaskMutation.mutateAsync(id);
    },
    searchTasks,
    fetchCategories: () => refetchCategories(),
  };
}
