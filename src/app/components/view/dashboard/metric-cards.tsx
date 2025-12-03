"use client"

import { useMemo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useTasks } from "./tasks-provider-client"

interface MetricData {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
  subtitle: string
  description: string
}

export function MetricCards() {
  const { tasks } = useTasks()

  const metrics: MetricData[] = useMemo(() => {
    // Garante que tasks seja um array
    const tasksList = Array.isArray(tasks) ? tasks : []
    const total = tasksList.length
    const completed = tasksList.filter((t) => t.status === "completed").length
    const pending = tasksList.filter((t) => t.status === "pending").length
    const inProgress = tasksList.filter((t) => t.status === "in_progress").length
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0

    return [
      {
        title: "Tarefas Concluídas",
        value: completed,
        change: "+0",
        trend: "up" as const,
        subtitle: "Aumento esta semana",
        description: "Progresso consistente",
      },
      {
        title: "Tarefas Pendentes",
        value: pending,
        change: "-0",
        trend: "down" as const,
        subtitle: "Redução em andamento",
        description: "Executando bem",
      },
      {
        title: "Em Progresso",
        value: inProgress,
        change: "+0",
        trend: "up" as const,
        subtitle: "Ativas agora",
        description: "Mantendo o foco",
      },
      {
        title: "Taxa de Conclusão",
        value: `${rate}%`,
        change: "+0%",
        trend: "up" as const,
        subtitle: "Desempenho geral",
        description: "Meta de conclusão",
      },
    ]
  }, [tasks])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3 hover:shadow-md dark:hover:shadow-slate-900 transition-shadow"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {metric.title}
            </h3>
            <span
              className={`text-xs font-medium flex items-center gap-1 ${
                metric.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {metric.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {metric.change}
            </span>
          </div>

          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {metric.value}
          </div>

          <div className="space-y-1">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {metric.subtitle}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              {metric.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
