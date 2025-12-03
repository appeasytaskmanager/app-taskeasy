"use client";

import { Sidebar, Header } from "@/app/components/view/dashboard";
import { TasksPageContent } from "@/app/components/view/tasks/tasks-page-content";
import { TasksProviderClient } from "@/app/components/view/dashboard/tasks-provider-client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <TasksProviderClient>
          <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
            {/* Header */}
            <Header />

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto">
              <TasksPageContent />
            </main>
          </div>
        </TasksProviderClient>
      </div>
    </ProtectedRoute>
  );
}
