"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    completionAlerts: true,
    projectUpdates: false,
    weeklyReport: true,
    pushNotifications: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    console.log("Notificações salvas:", notifications)
    alert("Preferências de notificação atualizadas com sucesso!")
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Notificações
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Gerencie suas preferências de notificação
        </p>
      </div>

      {/* Email Notifications */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-slate-900 dark:text-white">
              Notificações por Email
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Receba atualizações por email sobre suas tarefas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Notificações de Email
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receber atualizações gerais por email
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Lembretes de Tarefas
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receber lembretes de tarefas próximas do vencimento
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.taskReminders}
              onChange={() => handleToggle("taskReminders")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Alertas de Conclusão
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receber confirmação quando uma tarefa é concluída
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.completionAlerts}
              onChange={() => handleToggle("completionAlerts")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Relatório Semanal
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receber um relatório semanal do seu desempenho
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={() => handleToggle("weeklyReport")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <CardTitle className="text-slate-900 dark:text-white">
              Notificações Push
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Receba notificações push no seu navegador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Notificações Push
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receber notificações push no navegador
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Atualizações de Projetos
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Notificar sobre atualizações de projetos
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.projectUpdates}
              onChange={() => handleToggle("projectUpdates")}
              className="w-5 h-5 rounded cursor-pointer accent-blue-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Bell className="w-4 h-4" />
          Salvar Preferências
        </Button>
      </div>
    </div>
  )
}
