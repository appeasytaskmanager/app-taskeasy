"use client"

import { useState } from "react"
import { Search, Plus, Bell } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "./notification-dropdown"
import { UserMenu } from "./user-menu"
import { NewTaskModal } from "./new-task-modal"
import { useTasks } from "@/app/components/view/dashboard/tasks-provider-client"

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { searchTasks } = useTasks()

  const filteredTasks = searchQuery.trim() ? searchTasks(searchQuery) : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality can be integrated with tasks context
    console.log("Buscar:", searchQuery)
  }

  const handleTaskClick = (taskTitle: string) => {
    setSearchQuery(taskTitle)
    setIsSearchFocused(false)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearchFocused(false)
  }

  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white hidden md:block">
            Minhas Tarefas
          </h1>
          <form onSubmit={handleSearch} className="relative flex-1 hidden md:block w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 pl-10 h-9"
            />

            {/* Dropdown de resultados */}
            {isSearchFocused && filteredTasks.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  {filteredTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleTaskClick(task.title)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${
                                task.status === "completed"
                                  ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                                  : task.status === "in_progress"
                                  ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                                  : "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                              }`}
                            >
                              {task.status === "completed"
                                ? "Concluída"
                                : task.status === "in_progress"
                                ? "Em Progresso"
                                : "Pendente"}
                            </span>
                            <span
                              className={`text-xs font-medium ${
                                task.priority === "high"
                                  ? "text-red-600 dark:text-red-400"
                                  : task.priority === "medium"
                                  ? "text-orange-600 dark:text-orange-400"
                                  : "text-green-600 dark:text-green-400"
                              }`}
                            >
                              {task.priority === "high"
                                ? "Alta"
                                : task.priority === "medium"
                                ? "Média"
                                : "Baixa"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mensagem quando não há resultados */}
            {isSearchFocused && searchQuery.trim() && filteredTasks.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 p-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  Nenhuma tarefa encontrada para "{searchQuery}"
                </p>
              </div>
            )}

            {/* Overlay para fechar dropdown */}
            {isSearchFocused && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSearchFocused(false)}
              />
            )}
          </form>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NotificationDropdown />
          <UserMenu />
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className="gap-2 hidden sm:flex"
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </Button>
        </div>
      </header>

      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
