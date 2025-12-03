import { Sidebar } from "@/app/components/view/dashboard";
import { Header } from "@/app/components/view/dashboard/header";
import { TasksPageContent } from "@/app/components/view/tasks/tasks-page-content";
import { TasksProviderClient } from "@/app/components/view/dashboard/tasks-provider-client";

export default function TasksPage() {
  return (
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
  );
}
