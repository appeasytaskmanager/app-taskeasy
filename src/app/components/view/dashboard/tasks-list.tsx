"use client";

import { useState } from "react";

import { useTasks, Task } from "@/hooks/use-tasks";
import Link from "next/link";
import { Button } from "../../ui/button";
import { EditTaskModal } from "./edit-task-modal";
import { TaskRowActions } from "./task-row-actions";
import { useToast } from "@/app/components/ui/toast";
import { Select, SelectOption, StatusSelect } from "../../ui/select";

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

export function TasksList() {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState("date");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Garante que tasks seja um array
  const tasksList = Array.isArray(tasks) ? tasks : [];
  const recentTasks = tasksList.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "in_progress":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
  };

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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Carregando tarefas...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Tarefas Recentes
          </h2>
          <div className="w-40">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectOption value="date">Por Data</SelectOption>
              <SelectOption value="priority">Por Prioridade</SelectOption>
            </Select>
          </div>
        </div>

        <div className={recentTasks.length > 0 ? "overflow-visible pb-32" : ""}>
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
              {recentTasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {task.title}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelect
                      value={task.status}
                      onValueChange={(value) =>
                        handleStatusChange(task.id, value)
                      }
                      options={STATUS_OPTIONS}
                      className={getStatusColor(task.status)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority === "high"
                        ? "Alta"
                        : task.priority === "medium"
                        ? "Média"
                        : "Baixa"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                        : "Sem data"}
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
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
          <Link href="/tasks">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Ver todas as tarefas
            </Button>
          </Link>
        </div>
      </div>

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
