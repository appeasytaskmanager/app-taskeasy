"use client";

import { useTasks, Task } from "@/hooks/use-tasks";
import { useState, useEffect } from "react";

import { Input } from "@/app/components/ui/input";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { useToast } from "@/app/components/ui/toast";

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
}

export function EditTaskModal({ isOpen, task, onClose }: EditTaskModalProps) {
  const { updateTask, categories, fetchCategories } = useTasks();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    categoryId: string;
    dueDate: string;
    status: "completed" | "in_progress" | "pending" | "cancelled";
  }>({
    title: "",
    description: "",
    priority: "medium",
    categoryId: "",
    dueDate: "",
    status: "pending",
  });

  // Carrega categorias quando o modal abre
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  useEffect(() => {
    if (task) {
      // Formata a data para o input (YYYY-MM-DD)
      const dueDateFormatted = task.dueDate 
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : "";
      
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        categoryId: task.categoryId || "",
        dueDate: dueDateFormatted,
        status: task.status,
      });
    }
  }, [task, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task || !formData.title.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Título da tarefa é obrigatório.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Atualiza a tarefa (o hook já atualiza o estado automaticamente)
      await updateTask(task.id, {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
        status: formData.status,
        categoryId: formData.categoryId || undefined,
        dueDate: formData.dueDate || undefined,
      });

      toast({
        title: "Tarefa atualizada",
        description: "As alterações foram salvas com sucesso.",
        variant: "success",
      });

      onClose();
    } catch (err: any) {
      toast({
        title: "Erro ao atualizar tarefa",
        description: err.message || "Tente novamente.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Editar Tarefa
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              Título
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Digite o título da tarefa"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Digite a descrição (opcional)"
              className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              Categoria
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Prioridade
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "high" | "medium" | "low",
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as
                      | "completed"
                      | "in_progress"
                      | "pending",
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em Progresso</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              Vencimento
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title.trim()}
              className="flex-1"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
