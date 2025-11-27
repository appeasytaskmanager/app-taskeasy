import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricData {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
  subtitle: string
  description: string
}

const metrics: MetricData[] = [
  {
    title: "Tarefas Concluídas",
    value: "24",
    change: "+12.5%",
    trend: "up",
    subtitle: "Aumento esta semana",
    description: "Progresso consistente",
  },
  {
    title: "Tarefas Pendentes",
    value: "8",
    change: "-5%",
    trend: "down",
    subtitle: "Redução em andamento",
    description: "Executando bem",
  },
  {
    title: "Em Progresso",
    value: "5",
    change: "+2",
    trend: "up",
    subtitle: "Ativas agora",
    description: "Mantendo o foco",
  },
  {
    title: "Taxa de Conclusão",
    value: "87%",
    change: "+3%",
    trend: "up",
    subtitle: "Desempenho excelente",
    description: "Meta atingida",
  },
]

export function MetricCards() {
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
