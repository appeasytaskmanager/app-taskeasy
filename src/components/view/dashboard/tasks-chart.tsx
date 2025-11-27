"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const chartData = [
  { date: "Seg", tarefas: 4, concluídas: 2 },
  { date: "Ter", tarefas: 3, concluídas: 2 },
  { date: "Qua", tarefas: 6, concluídas: 4 },
  { date: "Qui", tarefas: 5, concluídas: 3 },
  { date: "Sex", tarefas: 7, concluídas: 5 },
  { date: "Sab", tarefas: 3, concluídas: 2 },
  { date: "Dom", tarefas: 4, concluídas: 3 },
]

const chartConfig = {
  tarefas: {
    label: "Tarefas Totais",
    color: "hsl(220, 90%, 56%)",
  },
  concluídas: {
    label: "Concluídas",
    color: "hsl(142, 76%, 36%)",
  },
}

export function TasksChart() {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <CardTitle className="text-slate-900 dark:text-white">
              Atividade de Tarefas
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Últimos 7 dias
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Últimos 30 dias
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
            >
              Últimos 7 dias
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillTarefas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillConcluidas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(210, 14%, 83%)"
              className="dark:stroke-slate-800"
            />
            <XAxis
              dataKey="date"
              stroke="hsl(210, 10%, 60%)"
              className="dark:stroke-slate-600"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(210, 10%, 60%)"
              className="dark:stroke-slate-600"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="tarefas"
              stroke="hsl(220, 90%, 56%)"
              fill="url(#fillTarefas)"
              strokeWidth={2}
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="concluídas"
              stroke="hsl(142, 76%, 36%)"
              fill="url(#fillConcluidas)"
              strokeWidth={2}
              isAnimationActive
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
