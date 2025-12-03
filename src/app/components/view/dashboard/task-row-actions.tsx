"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Task } from "@/hooks/use-tasks";

interface TaskRowActionsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskRowActions({
  task,
  onEdit,
  onDelete,
}: TaskRowActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(task)}
        className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 transition-colors"
        title="Editar tarefa"
      >
        <Edit2 className="w-4 h-4" />
      </button>

      <div className="relative">
        <button
          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
          className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-950 text-red-600 dark:text-red-400 transition-colors"
          title="Deletar tarefa"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {showDeleteConfirm && (
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 z-40 w-48">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Deseja deletar esta tarefa?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-3 py-1.5 text-sm rounded-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Não
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-3 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "..." : "Sim"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
