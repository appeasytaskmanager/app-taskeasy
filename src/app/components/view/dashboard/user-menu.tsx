"use client";

import { useState } from "react";
import { User, LogOut, Settings, CreditCard } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "../../ui/button";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, navigateTo } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigateTo(path);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-600 dark:text-slate-400"
      >
        <User className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-slate-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          <div className="p-2 space-y-1">
            <button
              onClick={() => handleNavigate("/profile")}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              Meu Perfil
            </button>
            <button
              onClick={() => handleNavigate("/settings")}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>
            <button
              onClick={() => handleNavigate("/billing")}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Faturamento
            </button>
          </div>

          <div className="p-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
