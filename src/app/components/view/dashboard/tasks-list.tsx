"use client";

import { useState } from "react";

import { useTasks, Task } from "@/hooks/use-tasks";
import Link from "next/link";
import { Button } from "../../ui/button";
import { EditTaskModal } from "./edit-task-modal";
import { TaskRowActions } from "./task-row-actions";

export function TasksList() {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const recentTasks = tasks.slice(0, 4);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída";
      case "in_progress":
        return "Em Progresso";
      case "pending":
        return "Pendente";
      default:
        return status;
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

  const handleStatusChange = async (
    id: string,
    status: "completed" | "in_progress" | "pending"
  ) => {
    await updateTask(id, { status });
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Tarefas Recentes
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "priority")}
            className="px-3 py-1 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer"
          >
            <option value="date">Por Data</option>
            <option value="priority">Por Prioridade</option>
          </select>
        </div>

        <div className="overflow-x-auto">
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
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value as
                            | "completed"
                            | "in_progress"
                            | "pending"
                        )
                      }
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                        task.status
                      )}`}
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em Progresso</option>
                      <option value="completed">Concluída</option>
                    </select>
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
