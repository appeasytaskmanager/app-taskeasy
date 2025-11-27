import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"

export function TasksList() {
  const recentTasks = [
    {
      id: 1,
      title: "Implementar dashboard",
      status: "in_progress",
      priority: "high",
      dueDate: "2025-11-30",
    },
    {
      id: 2,
      title: "Revisar código",
      status: "pending",
      priority: "medium",
      dueDate: "2025-12-01",
    },
    {
      id: 3,
      title: "Testes unitários",
      status: "completed",
      priority: "high",
      dueDate: "2025-11-28",
    },
    {
      id: 4,
      title: "Documentação",
      status: "pending",
      priority: "low",
      dueDate: "2025-12-05",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
      case "in_progress":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída"
      case "in_progress":
        return "Em Progresso"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-orange-600 dark:text-orange-400"
      case "low":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Tarefas Recentes
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 dark:text-slate-400"
        >
          <Settings className="w-5 h-5" />
        </Button>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {recentTasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {task.title}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
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
                    {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          Ver todas as tarefas
        </Button>
      </div>
    </div>
  )
}
