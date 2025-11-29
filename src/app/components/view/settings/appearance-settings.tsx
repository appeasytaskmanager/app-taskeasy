"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"

export function AppearanceSettings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    // Carregar tema salvo do localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    // Aplicar tema
    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else if (newTheme === "light") {
      html.classList.remove("dark")
    } else {
      // system - usar preferência do sistema
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Aparência
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Customize a aparência da aplicação
        </p>
      </div>

      {/* Theme Selection */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Tema
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Escolha como você prefere ver a aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Light Theme */}
          <div
            onClick={() => handleThemeChange("light")}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              theme === "light"
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Sun className={`w-5 h-5 ${theme === "light" ? "text-blue-600" : "text-slate-600 dark:text-slate-400"}`} />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>
                  Claro
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Interface com fundo claro
                </p>
              </div>
              {theme === "light" && (
                <div className="ml-auto w-4 h-4 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="space-y-1">
                <div className="h-2 bg-slate-300 rounded w-3/4" />
                <div className="h-2 bg-slate-200 rounded w-full" />
                <div className="h-2 bg-slate-200 rounded w-5/6" />
              </div>
            </div>
          </div>

          {/* Dark Theme */}
          <div
            onClick={() => handleThemeChange("dark")}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              theme === "dark"
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Moon className={`w-5 h-5 ${theme === "dark" ? "text-blue-600" : "text-slate-600 dark:text-slate-400"}`} />
              <div>
                <p className={`font-medium ${theme === "dark" ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>
                  Escuro
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Interface com fundo escuro
                </p>
              </div>
              {theme === "dark" && (
                <div className="ml-auto w-4 h-4 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <div className="space-y-1">
                <div className="h-2 bg-slate-600 rounded w-3/4" />
                <div className="h-2 bg-slate-700 rounded w-full" />
                <div className="h-2 bg-slate-700 rounded w-5/6" />
              </div>
            </div>
          </div>

          {/* System Theme */}
          <div
            onClick={() => handleThemeChange("system")}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              theme === "system"
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Monitor className={`w-5 h-5 ${theme === "system" ? "text-blue-600" : "text-slate-600 dark:text-slate-400"}`} />
              <div>
                <p className={`font-medium ${theme === "system" ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>
                  Sistema
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Seguir preferência do sistema
                </p>
              </div>
              {theme === "system" && (
                <div className="ml-auto w-4 h-4 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="bg-gradient-to-r from-white to-slate-900 rounded-lg p-3 border border-slate-400">
              <div className="space-y-1">
                <div className="h-2 bg-gradient-to-r from-slate-300 to-slate-600 rounded w-3/4" />
                <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-700 rounded w-full" />
                <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-700 rounded w-5/6" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 As mudanças de tema são aplicadas imediatamente em toda a aplicação.
        </p>
      </div>
    </div>
  )
}
