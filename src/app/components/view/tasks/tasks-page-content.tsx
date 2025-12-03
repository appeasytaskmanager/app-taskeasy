"use client";

import { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { useTasks, Task } from "@/hooks/use-tasks";

import {
  NewTaskModal,
  EditTaskModal,
  TaskRowActions,
} from "@/app/components/view/dashboard";
import { useToast } from "@/app/components/ui/toast";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectOption, StatusSelect } from "../../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pendente",
    className:
      "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
  },
  {
    value: "in_progress",
    label: "Em Progresso",
    className: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  },
  {
    value: "completed",
    label: "Concluída",
    className:
      "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
  },
];

export function TasksPageContent() {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Garante que tasks seja um array
  const tasksList = Array.isArray(tasks) ? tasks : [];

  // Aplicar filtros
  const filteredTasks = tasksList.filter((task) => {
    // Filtro por nome
    const matchesSearch =
      searchQuery.trim() === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por status
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    // Filtro por prioridade
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Ordenar por data de criação (mais recentes primeiro)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });

  const clearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterStatus !== "all" ||
    filterPriority !== "all";

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-orange-600 dark:text-orange-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return priority;
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTask(id, {
        status: status as "completed" | "in_progress" | "pending",
      });
      toast({
        title: "Status atualizado",
        description: "O status da tarefa foi alterado.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description:
          error instanceof Error ? error.message : "Tente novamente.",
        variant: "error",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <p className="text-slate-600 dark:text-slate-400">
            Carregando tarefas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Minhas Tarefas
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Total de {tasksList.length} tarefa
              {tasksList.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </Button>
        </div>

        {/* Filtros */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-900 dark:text-white">
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca por nome */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome ou descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Filtro por Status */}
              <div className="w-full md:w-48">
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                  placeholder="Todos os status"
                >
                  <SelectOption value="all">Todos os status</SelectOption>
                  <SelectOption value="pending">Pendente</SelectOption>
                  <SelectOption value="in_progress">Em Progresso</SelectOption>
                  <SelectOption value="completed">Concluída</SelectOption>
                </Select>
              </div>

              {/* Filtro por Prioridade */}
              <div className="w-full md:w-48">
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                  placeholder="Todas as prioridades"
                >
                  <SelectOption value="all">Todas as prioridades</SelectOption>
                  <SelectOption value="high">Alta</SelectOption>
                  <SelectOption value="medium">Média</SelectOption>
                  <SelectOption value="low">Baixa</SelectOption>
                </Select>
              </div>

              {/* Limpar filtros */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="gap-2 border-slate-200 dark:border-slate-700"
                >
                  <X className="w-4 h-4" />
                  Limpar
                </Button>
              )}
            </div>

            {/* Indicador de resultados */}
            {hasActiveFilters && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                {sortedTasks.length} tarefa{sortedTasks.length !== 1 ? "s" : ""}{" "}
                encontrada{sortedTasks.length !== 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Lista de Tarefas */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Tarefas
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {sortedTasks.length} tarefa{sortedTasks.length !== 1 ? "s" : ""}{" "}
              listada{sortedTasks.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={sortedTasks.length > 0 ? "overflow-visible pb-32" : ""}
            >
              {sortedTasks.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Tarefa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Prioridade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Vencimento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {sortedTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p
                            className={`text-sm font-medium ${
                              task.status === "completed"
                                ? "line-through text-slate-500"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <StatusSelect
                            value={task.status}
                            onValueChange={(value) =>
                              handleStatusChange(task.id, value)
                            }
                            options={STATUS_OPTIONS}
                            className={
                              task.status === "completed"
                                ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                                : task.status === "in_progress"
                                ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                : "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                            }
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {getPriorityLabel(task.priority)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString(
                                  "pt-BR"
                                )
                              : "-"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <TaskRowActions
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">
                    {hasActiveFilters
                      ? "Nenhuma tarefa encontrada com os filtros aplicados"
                      : "Nenhuma tarefa cadastrada"}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="link"
                      onClick={clearFilters}
                      className="mt-2 text-blue-600 dark:text-blue-400"
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </>
  );
}
