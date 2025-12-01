"use client"

import {
  Home,
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Tarefas", icon: CheckSquare, href: "/tasks" },
  { name: "Relatórios", icon: BarChart3, href: "/reports" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const handleSettings = () => {
    router.push("/settings")
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign", { method: "POST" })
    } catch (err) {
      console.error("Erro ao fazer logout:", err)
    } finally {
      router.push("/auth/login")
      setIsOpen(false)
    }
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static w-64 h-screen bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40 transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">TaskEasy</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item.href)
                  ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 px-3 py-3 space-y-1">
          {/* Perfil com submenu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full"
            >
              <UserIcon className="w-4 h-4" />
              Perfil
            </button>

            {/* Submenu do Perfil */}
            {isProfileMenuOpen && (
              <div className="mt-1 ml-3 pl-3 border-l border-slate-200 dark:border-slate-700 py-2 space-y-1">
                <div className="px-2 py-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Usuário Logado</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {user?.name || "Usuário"}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {user?.email || "email@example.com"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sair */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
