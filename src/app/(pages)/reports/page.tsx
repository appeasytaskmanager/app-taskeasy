import { Sidebar } from "@/app/components/view/dashboard";
import { Header } from "@/app/components/view/dashboard/header";
import { ReportsContent } from "@/app/components/view/reports";
import { TasksProviderClient } from "@/app/components/view/dashboard/tasks-provider-client";

export default function ReportsPage() {
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
            <ReportsContent />
          </main>
        </div>
      </TasksProviderClient>
    </div>
  );
}
