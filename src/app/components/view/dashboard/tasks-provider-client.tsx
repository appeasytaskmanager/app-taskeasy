"use client"

import React, { createContext, useContext } from "react"
import { useTasks as useTasksHook, type UseTasksReturn } from "@/hooks/use-tasks"
export type { Task } from "@/hooks/use-tasks"

const TasksContext = createContext<UseTasksReturn | null>(null)

export const TasksProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useTasksHook()
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks(): UseTasksReturn {
  const ctx = useContext(TasksContext)
  if (!ctx) {
    throw new Error("useTasks must be used within a TasksProviderClient")
  }
  return ctx
}
