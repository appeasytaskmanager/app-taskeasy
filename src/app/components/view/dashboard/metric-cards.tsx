"use client"

import { useMemo, useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useTasks } from "./tasks-provider-client"

export function MetricCards() {
  const { tasks } = useTasks()

  const { completedCount, pendingCount, inProgressCount, completionRate } = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const pending = tasks.filter((t) => t.status === "pending").length
    const inProgress = tasks.filter((t) => t.status === "in_progress").length
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0
    return {
      completedCount: completed,
      pendingCount: pending,
      inProgressCount: inProgress,
      completionRate: rate,
    }
  }, [tasks])

  const [changed, setChanged] = useState<Record<string, "up" | "down" | null>>({})

  // Compare with previous snapshot saved in localStorage to show deltas
  useEffect(() => {
    try {
      const KEY = "taskeasy_metrics_snapshot_v1"
      const prevRaw = localStorage.getItem(KEY)
      const prev = prevRaw ? JSON.parse(prevRaw) : null

      const diffs: Record<string, number> = {}
      diffs["Tarefas Concluídas"] = completedCount - (prev?.completedCount ?? completedCount)
      diffs["Tarefas Pendentes"] = pendingCount - (prev?.pendingCount ?? pendingCount)
      diffs["Em Progresso"] = inProgressCount - (prev?.inProgressCount ?? inProgressCount)
      // completionRate is percent number
      diffs["Taxa de Conclusão"] = completionRate - (prev?.completionRate ?? completionRate)

      const newChanged: Record<string, "up" | "down" | null> = {}
      let anyChange = false
      Object.entries(diffs).forEach(([k, v]) => {
        if (v > 0) {
          newChanged[k] = "up"
          anyChange = true
        } else if (v < 0) {
          newChanged[k] = "down"
          anyChange = true
        } else {
          newChanged[k] = null
        }
      })

      if (anyChange) {
        setChanged(newChanged)
        // clear highlight after 1.2s
        const t = setTimeout(() => setChanged({}), 1200)
        // save snapshot now so next compare has baseline
        try {
          const snapshot = { completedCount, pendingCount, inProgressCount, completionRate, ts: Date.now() }
          localStorage.setItem(KEY, JSON.stringify(snapshot))
        } catch {}
        return () => clearTimeout(t)
      }

      // Save current snapshot for next comparison (no change)
      try {
        const snapshot = { completedCount, pendingCount, inProgressCount, completionRate, ts: Date.now() }
        localStorage.setItem(KEY, JSON.stringify(snapshot))
      } catch {}
    } catch (err) {
      // ignore localStorage errors
    }
  }, [completedCount, pendingCount, inProgressCount, completionRate])

  const metrics = [
    {
      title: "Tarefas Concluídas",
      value: completedCount,
      subtitle: "Aumento esta semana",
      description: "Progresso consistente",
      trend: changed["Tarefas Concluídas"] ?? null,
      change: changed["Tarefas Concluídas"]
        ? `${changed["Tarefas Concluídas"] === "up" ? "+" : ""}${Math.abs(
            completedCount - (JSON.parse(localStorage.getItem("taskeasy_metrics_snapshot_v1") || "null")?.completedCount ?? completedCount)
          )}`
        : "",
    },
    {
      title: "Tarefas Pendentes",
      value: pendingCount,
      subtitle: "Redução em andamento",
      description: "Executando bem",
      trend: changed["Tarefas Pendentes"] ?? null,
      change: changed["Tarefas Pendentes"]
        ? `${changed["Tarefas Pendentes"] === "up" ? "+" : ""}${Math.abs(
            pendingCount - (JSON.parse(localStorage.getItem("taskeasy_metrics_snapshot_v1") || "null")?.pendingCount ?? pendingCount)
          )}`
        : "",
    },
    {
      title: "Em Progresso",
      value: inProgressCount,
      subtitle: "Ativas agora",
      description: "Mantendo o foco",
      trend: changed["Em Progresso"] ?? null,
      change: changed["Em Progresso"]
        ? `${changed["Em Progresso"] === "up" ? "+" : ""}${Math.abs(
            inProgressCount - (JSON.parse(localStorage.getItem("taskeasy_metrics_snapshot_v1") || "null")?.inProgressCount ?? inProgressCount)
          )}`
        : "",
    },
    {
      title: "Taxa de Conclusão",
      value: `${completionRate}%`,
      subtitle: "Desempenho geral",
      description: "Meta de conclusão",
      trend: changed["Taxa de Conclusão"] ?? null,
      change: changed["Taxa de Conclusão"]
        ? `${changed["Taxa de Conclusão"] === "up" ? "+" : ""}${Math.abs(
            completionRate - (JSON.parse(localStorage.getItem("taskeasy_metrics_snapshot_v1") || "null")?.completionRate ?? completionRate)
          )}%`
        : "",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3 hover:shadow-md dark:hover:shadow-slate-900 transition-shadow ${
            metric.trend === "up"
              ? "ring-2 ring-offset-1 ring-green-300 dark:ring-green-700 animate-pulse"
              : metric.trend === "down"
              ? "ring-2 ring-offset-1 ring-red-300 dark:ring-red-700 animate-pulse"
              : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {metric.title}
            </h3>
            {metric.change ? (
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
            ) : null}
          </div>

          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {metric.value}
          </div>

          <div className="space-y-1">
            <div className="text-sm text-slate-700 dark:text-slate-300">{metric.subtitle}</div>
            <div className="text-xs text-slate-500 dark:text-slate-500">{metric.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
