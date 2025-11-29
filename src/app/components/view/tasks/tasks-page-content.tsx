"use client"

import { useState } from "react"
import { Plus, Eye, EyeOff } from "lucide-react"
import { useTasks } from "@/hooks/use-tasks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { NewTaskModal } from "@/app/components/view/dashboard"
import Link from "next/link"

export function TasksPageContent() {
  const { tasks, loading, updateTask, deleteTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "priority">("date")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "in_progress" | "pending">("all")

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true
    return task.status === filterStatus
  })

  // Ordenar tarefas
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  })

  const recentTasks = sortedTasks.slice(0, 5)

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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Média"
      case "low":
        return "Baixa"
      default:
        return priority
    }
  }

  const handleStatusChange = async (
    id: number,
    status: "completed" | "in_progress" | "pending"
  ) => {
    await updateTask(id, { status })
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <p className="text-slate-600 dark:text-slate-400">Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Minhas Tarefas
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Total de {tasks.length} tarefa{tasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Tarefas Recentes */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div>
            <CardTitle className="text-slate-900 dark:text-white">
              Tarefas Recentes
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Suas 5 primeiras tarefas
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {recentTasks.length > 0 ? (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() =>
                      handleStatusChange(
                        task.id,
                        task.status === "completed" ? "pending" : "completed"
                      )
                    }
                    className="mt-1 w-5 h-5 rounded cursor-pointer accent-blue-600"
                  />

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <p className={`font-medium ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-900 dark:text-white"}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        Prioridade: {getPriorityLabel(task.priority)}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Vence em {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value as "completed" | "in_progress" | "pending")
                    }
                    className={`hidden md:inline-flex px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${getStatusColor(task.status)}`}
                  >
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Progresso</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Nenhuma tarefa encontrada
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Todas as Tarefas */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-slate-900 dark:text-white">
                Todas as Tarefas
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {sortedTasks.length} tarefa{sortedTasks.length !== 1 ? "s" : ""} no total
              </CardDescription>
            </div>
            {sortedTasks.length > 5 && (
              <Link href="#all-tasks">
                <Button
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Ver Todas
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
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
                {sortedTasks.slice(0, 10).map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4">
                      <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-slate-500" : "text-slate-900 dark:text-white"}`}>
                        {task.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task.id,
                            e.target.value as "completed" | "in_progress" | "pending"
                          )
                        }
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(task.status)}`}
                      >
                        <option value="pending">Pendente</option>
                        <option value="in_progress">Em Progresso</option>
                        <option value="completed">Concluída</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
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
        </CardContent>
      </Card>
    </div>
  )
}
