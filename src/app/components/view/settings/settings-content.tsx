"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import Link from "next/link"
import { Bell, Moon, Lock, ArrowRight } from "lucide-react"

export function SettingsContent() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Configurações
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Personalize sua experiência no TaskEasy
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Link href="/settings/notifications">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Notificações
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      Gerencie seus alertas
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Configure como você gostaria de receber notificações por email, push e muito mais.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Appearance */}
        <Link href="/settings/appearance">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-all h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <Moon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Aparência
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      Customize o tema
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Escolha entre temas claro, escuro ou automático de acordo com sua preferência.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Security */}
        <Link href="/settings/security">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900 dark:text-white">
                      Segurança
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      Proteção de dados
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Saiba como seus dados são protegidos e gerencie as configurações de segurança.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Info */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          💡 Suas preferências são salvas automaticamente e sincronizadas em todos os seus dispositivos.
        </p>
      </div>
    </div>
  )
}
