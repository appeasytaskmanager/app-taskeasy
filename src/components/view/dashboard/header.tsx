import { Search, Plus, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-slate-950">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white hidden md:block">
          Minhas Tarefas
        </h1>
        <div className="relative flex-1 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Buscar tarefas..."
            className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 pl-10 h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 dark:text-slate-400"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 dark:text-slate-400"
        >
          <User className="w-5 h-5" />
        </Button>
        <Button size="sm" className="gap-2 hidden sm:flex">
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </Button>
      </div>
    </header>
  )
}
