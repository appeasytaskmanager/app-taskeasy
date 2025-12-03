"use client";

import { useTasks } from "@/hooks/use-tasks";
import { useState, useEffect } from "react";

import { Input } from "@/app/components/ui/input";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { useToast } from "@/app/components/ui/toast";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
  const { createTask, categories, fetchCategories } = useTasks();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    categoryId: string;
    dueDate: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    categoryId: "",
    dueDate: "",
  });

  // Carrega categorias quando o modal abre
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  // Define categoria padrão quando categorias são carregadas
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, formData.categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Título da tarefa é obrigatório.",
        variant: "warning",
      });
      return;
    }

    if (!formData.categoryId) {
      toast({
        title: "Campo obrigatório",
        description: "Categoria é obrigatória.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Cria a tarefa (o hook já atualiza o estado automaticamente)
      await createTask({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
        status: "pending",
        categoryId: formData.categoryId,
        dueDate: formData.dueDate || undefined,
      });

      // Limpa formulário
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        categoryId: categories[0]?.id || "",
        dueDate: "",
      });

      toast({
        title: "Tarefa criada",
        description: "A tarefa foi criada com sucesso.",
        variant: "success",
      });

      onClose();
    } catch (err: unknown) {
      toast({
        title: "Erro ao criar tarefa",
        description: (err as Error).message || "Tente novamente.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Nova Tarefa
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
              required
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
              {loading ? "Criando..." : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
