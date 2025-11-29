import {
  Sidebar,
  Header,
} from "@/app/components/view/dashboard"
import { SettingsContent } from "@/app/components/view/settings"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <SettingsContent />
        </main>
      </div>
    </div>
  )
}
