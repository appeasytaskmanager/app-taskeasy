"use client"

import { Search } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { NotificationDropdown } from "./notification-dropdown"
import { UserMenu } from "./user-menu"

export function ReportsHeader() {
  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-slate-950">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white hidden md:block">
            Relatórios
          </h1>
          <form className="relative flex-1 hidden md:block w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Buscar relatório..."
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 pl-10 h-9"
            />
          </form>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NotificationDropdown />
          <UserMenu />
        </div>
      </header>
    </>
  )
}
