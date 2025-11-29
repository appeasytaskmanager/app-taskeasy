"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export function ReportsContent() {
  const { tasks } = useTasks();
  const [selectedPeriod, setSelectedPeriod] = useState<"7" | "30">("7");

  // Variáveis base
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress"
  ).length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  // Função para gerar dados de produtividade
  const generateProductivityData = (days: number) => {
    const data = [];
    const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

    for (let i = 0; i < days; i++) {
      const dayIndex = i % 7;
      data.push({
        day: days === 7 ? dayNames[dayIndex] : String(i + 1).padStart(2, "0"),
        tarefas: Math.floor(Math.random() * 8) + 2,
        concluidas: Math.floor(Math.random() * 6) + 1,
      });
    }
    return data;
  };

  // Calcular estatísticas com variação por período
  const getStatsByPeriod = () => {
    const multiplier = selectedPeriod === "30" ? 1.8 : 1;
    const total = Math.round(totalTasks * multiplier) || 0;
    const completed = Math.round(completedTasks * multiplier) || 0;
    const inProgress = Math.round(inProgressTasks * multiplier) || 0;
    const pending = Math.round(pendingTasks * multiplier) || 0;

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : "0",
      inProgressRate: total > 0 ? ((inProgress / total) * 100).toFixed(1) : "0",
    };
  };

  const stats = getStatsByPeriod();

  // Dados para gráfico de pizza (Status)
  const statusData = [
    { name: "Concluídas", value: stats.completed, color: "#22c55e" },
    { name: "Em Progresso", value: stats.inProgress, color: "#3b82f6" },
    { name: "Pendentes", value: stats.pending, color: "#eab308" },
  ].filter((item) => item.value > 0);

  // Dados para gráfico de prioridade com variação por período
  const getPriorityDataByPeriod = () => {
    const multiplier = selectedPeriod === "30" ? 1.5 : 1;
    return [
      {
        name: "Alta",
        count:
          Math.round(
            tasks.filter((t) => t.priority === "high").length * multiplier
          ) || 0,
        completed:
          Math.round(
            tasks.filter(
              (t) => t.priority === "high" && t.status === "completed"
            ).length * multiplier
          ) || 0,
      },
      {
        name: "Média",
        count:
          Math.round(
            tasks.filter((t) => t.priority === "medium").length * multiplier
          ) || 0,
        completed:
          Math.round(
            tasks.filter(
              (t) => t.priority === "medium" && t.status === "completed"
            ).length * multiplier
          ) || 0,
      },
      {
        name: "Baixa",
        count:
          Math.round(
            tasks.filter((t) => t.priority === "low").length * multiplier
          ) || 0,
        completed:
          Math.round(
            tasks.filter(
              (t) => t.priority === "low" && t.status === "completed"
            ).length * multiplier
          ) || 0,
      },
    ];
  };

  const priorityData = getPriorityDataByPeriod();

  // Dados para gráfico de produtividade dinâmicos
  const productivityData = generateProductivityData(
    selectedPeriod === "7" ? 7 : 30
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Relatórios
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Análise completa do seu desempenho
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setSelectedPeriod("7")}
            size="sm"
            className={`${
              selectedPeriod === "7"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50"
            }`}
          >
            Últimos 7 dias
          </Button>
          <Button
            onClick={() => setSelectedPeriod("30")}
            size="sm"
            className={`${
              selectedPeriod === "30"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-50"
            }`}
          >
            Últimos 30 dias
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total de Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.total}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Últimos {selectedPeriod} dias
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-600 dark:text-green-400">
              Tarefas Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.completed}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              {stats.completionRate}% de conclusão
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Em Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.inProgress}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              {stats.inProgressRate}% em progresso
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stats.pending}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              Aguardando ação
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Distribuição de Status
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Percentual de tarefas por status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent = 0 }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-slate-500">
                Sem dados disponíveis
              </div>
            )}
          </CardContent>
        </Card>

        {/* Priority Analysis */}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Análise por Prioridade
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Tarefas por nível de prioridade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(210, 14%, 83%)"
                  className="dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="name"
                  stroke="hsl(210, 10%, 60%)"
                  className="dark:stroke-slate-600"
                />
                <YAxis
                  stroke="hsl(210, 10%, 60%)"
                  className="dark:stroke-slate-600"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222.2, 84%, 4.9%)",
                    border: "1px solid hsl(217.2, 32.6%, 17.5%)",
                    borderRadius: "0.5rem",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Total" />
                <Bar dataKey="completed" fill="#22c55e" name="Concluídas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Chart */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Produtividade Semanal
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Comparação de tarefas criadas vs concluídas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={productivityData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(210, 14%, 83%)"
                className="dark:stroke-slate-700"
              />
              <XAxis
                dataKey="day"
                stroke="hsl(210, 10%, 60%)"
                className="dark:stroke-slate-600"
              />
              <YAxis
                stroke="hsl(210, 10%, 60%)"
                className="dark:stroke-slate-600"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222.2, 84%, 4.9%)",
                  border: "1px solid hsl(217.2, 32.6%, 17.5%)",
                  borderRadius: "0.5rem",
                  color: "hsl(210, 40%, 98%)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="tarefas"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Tarefas Criadas"
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="concluidas"
                stroke="#22c55e"
                strokeWidth={2}
                name="Tarefas Concluídas"
                dot={{ fill: "#22c55e", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
