"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Task } from "@/hooks/use-tasks";
import { useToast } from "@/app/components/ui/toast";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/components/ui/alert-dialog";

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
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
      setShowDeleteConfirm(false);
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi excluída com sucesso.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir a tarefa.",
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 transition-colors"
          title="Editar tarefa"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-950 text-red-600 dark:text-red-400 transition-colors"
          title="Deletar tarefa"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <AlertDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a tarefa "{task.title}"? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            {isDeleting ? "Excluindo..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
}
