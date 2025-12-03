"use client";

import { useState, useCallback, useEffect } from "react";
import { taskService, Task, Category, CreateTaskData, UpdateTaskData } from "@/services/task.service";

export interface UseTasksReturn {
  tasks: Task[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, task: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  searchTasks: (query: string) => Task[];
  fetchCategories: () => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca categorias
  const fetchCategories = useCallback(async () => {
    try {
      const cats = await taskService.getCategories();
      setCategories(cats);
      
      // Se não houver categorias, cria a padrão
      if (cats.length === 0) {
        const defaultCat = await taskService.getDefaultCategory();
        setCategories([defaultCat]);
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      // Tenta obter categoria padrão
      try {
        const defaultCat = await taskService.getDefaultCategory();
        setCategories([defaultCat]);
      } catch (defaultErr) {
        console.error('Erro ao obter categoria padrão:', defaultErr);
      }
    }
  }, []);

  // Busca tarefas da API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar tarefas");
      setTasks([]); // Limpa tarefas em caso de erro
    } finally {
      setLoading(false);
    }
  }, []);

  // Cria nova tarefa
  const createTask = useCallback(
    async (task: CreateTaskData) => {
      try {
        const newTask = await taskService.createTask(task);
        setTasks((prev) => [...prev, newTask]);
        return newTask;
      } catch (err: any) {
        const errorMessage = err.message || "Erro ao criar tarefa";
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  // Atualiza tarefa
  const updateTask = useCallback(async (id: string, updates: UpdateTaskData) => {
    try {
      const updated = await taskService.updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao atualizar tarefa";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Deleta tarefa
  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao deletar tarefa";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Busca tarefas por query
  const searchTasks = useCallback(
    (query: string) => {
      if (!query.trim()) return tasks;
      return tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description?.toLowerCase().includes(query.toLowerCase())
      );
    },
    [tasks]
  );

  // Busca tarefas e categorias ao montar
  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, [fetchTasks, fetchCategories]);

  return {
    tasks,
    categories,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    fetchCategories,
  };
}
