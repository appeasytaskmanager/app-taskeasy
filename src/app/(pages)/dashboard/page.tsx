"use client";

import {
  Sidebar,
  Header,
  MetricCards,
  TasksChart,
  TasksList,
} from "@/app/components/view/dashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            {/* Metrics Grid */}
            <MetricCards />
            {/* Tasks Table */}
            <TasksList />
            {/* Charts and Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2">
                <TasksChart />
              </div>

              {/* Statistics Sidebar */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Resumo
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">
                        Taxa de Produtividade
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        87%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "87%" }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 pt-2">
                      Desempenho acima da meta semanal
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Próximos Prazos
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900 dark:text-white">
                        Implementar Dashboard
                      </p>
                      <p className="text-slate-500 dark:text-slate-500">
                        Hoje às 18h
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-900 dark:text-white">
                        Revisar Código
                      </p>
                      <p className="text-slate-500 dark:text-slate-500">
                        Amanhã de manhã
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
