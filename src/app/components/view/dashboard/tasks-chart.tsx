"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui";

const chartData7Days = [
  { date: "Seg", tarefas: 4, concluídas: 2 },
  { date: "Ter", tarefas: 3, concluídas: 2 },
  { date: "Qua", tarefas: 6, concluídas: 4 },
  { date: "Qui", tarefas: 5, concluídas: 3 },
  { date: "Sex", tarefas: 7, concluídas: 5 },
  { date: "Sab", tarefas: 3, concluídas: 2 },
  { date: "Dom", tarefas: 4, concluídas: 3 },
];

const chartData30Days = [
  { date: "01", tarefas: 2, concluídas: 1 },
  { date: "02", tarefas: 3, concluídas: 2 },
  { date: "03", tarefas: 4, concluídas: 2 },
  { date: "04", tarefas: 5, concluídas: 3 },
  { date: "05", tarefas: 4, concluídas: 3 },
  { date: "06", tarefas: 6, concluídas: 4 },
  { date: "07", tarefas: 3, concluídas: 2 },
  { date: "08", tarefas: 7, concluídas: 5 },
  { date: "09", tarefas: 5, concluídas: 3 },
  { date: "10", tarefas: 8, concluídas: 6 },
  { date: "11", tarefas: 4, concluídas: 3 },
  { date: "12", tarefas: 6, concluídas: 4 },
  { date: "13", tarefas: 5, concluídas: 3 },
  { date: "14", tarefas: 7, concluídas: 5 },
  { date: "15", tarefas: 6, concluídas: 4 },
  { date: "16", tarefas: 4, concluídas: 2 },
  { date: "17", tarefas: 5, concluídas: 3 },
  { date: "18", tarefas: 8, concluídas: 6 },
  { date: "19", tarefas: 3, concluídas: 2 },
  { date: "20", tarefas: 6, concluídas: 4 },
];

const chartConfig = {
  tarefas: {
    label: "Tarefas Totais",
    color: "hsl(220, 90%, 56%)",
  },
  concluídas: {
    label: "Concluídas",
    color: "hsl(142, 76%, 36%)",
  },
};

export function TasksChart() {
  const [period, setPeriod] = useState<"7" | "30">("7");
  const chartData = period === "7" ? chartData7Days : chartData30Days;

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <CardTitle className="text-slate-900 dark:text-white">
              Atividade de Tarefas
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              {period === "7" ? "Últimos 7 dias" : "Últimos 30 dias"}
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setPeriod("30")}
              variant="outline"
              size="sm"
              className={`${
                period === "30"
                  ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                  : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              Últimos 30 dias
            </Button>
            <Button
              onClick={() => setPeriod("7")}
              variant="outline"
              size="sm"
              className={`${
                period === "7"
                  ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                  : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              Últimos 7 dias
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillTarefas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(220, 90%, 56%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(220, 90%, 56%)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillConcluidas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(142, 76%, 36%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(142, 76%, 36%)"
                  stopOpacity={0}
                />
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
  );
}
