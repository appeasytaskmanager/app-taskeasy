import {
  Sidebar,
  ReportsHeader,
} from "@/app/components/view/dashboard"
import { ReportsContent } from "@/app/components/view/reports"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <ReportsHeader />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <ReportsContent />
        </main>
      </div>
    </div>
  )
}
