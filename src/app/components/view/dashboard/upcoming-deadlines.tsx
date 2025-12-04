"use client";

import { useTasks } from "@/hooks/use-tasks";
import { CalendarClock } from "lucide-react";

export function UpcomingDeadlines() {
  const { tasks } = useTasks();

  // Garante que tasks seja um array
  const tasksList = Array.isArray(tasks) ? tasks : [];

  // Filtra tarefas pendentes que têm dueDate
  const pendingTasks = tasksList
    .filter((task) => task.status === "pending" && task.dueDate)
    .sort((a, b) => {
      // Ordena por data de vencimento (mais próximas primeiro)
      const dateA = new Date(a.dueDate!).getTime();
      const dateB = new Date(b.dueDate!).getTime();
      return dateA - dateB;
    })
    .slice(0, 2); // Pega apenas as 2 primeiras

  // Função para formatar a data de forma amigável
  const formatDeadline = (dueDate: string): string => {
    const now = new Date();
    const deadline = new Date(dueDate);

    // Remove as horas para comparar apenas datas
    now.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hoje";
    } else if (diffDays === 1) {
      return "Amanhã";
    } else if (diffDays === -1) {
      return "Ontem";
    } else if (diffDays < 0) {
      return `Atrasada ${Math.abs(diffDays)} dias`;
    } else if (diffDays <= 7) {
      return `Em ${diffDays} dias`;
    } else {
      // Formata a data completa
      return deadline.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <CalendarClock className="w-5 h-5" />
        Próximos Prazos
      </h3>

      {pendingTasks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhuma tarefa pendente no momento
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="text-sm border-l-2 border-blue-500 pl-3 py-1"
            >
              <p className="font-medium text-slate-900 dark:text-white line-clamp-2">
                {task.title}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {formatDeadline(task.dueDate!)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

