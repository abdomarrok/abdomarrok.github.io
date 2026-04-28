"use client"

import { useSession } from "next-auth/react"
import { Users, Briefcase, Code, Eye } from "lucide-react"

export default function AdminDashboard() {
  const { data: session } = useSession()

  const stats = [
    { label: "Total Projects", value: "12", icon: Briefcase, color: "text-blue-500" },
    { label: "Skills Listed", value: "10", icon: Code, color: "text-emerald-500" },
    { label: "Portfolio Views", value: "1.2k", icon: Eye, color: "text-purple-500" },
    { label: "Admin Users", value: "1", icon: Users, color: "text-orange-500" },
  ]

  return (
    <div className="p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">Welcome back, {session?.user?.name || "Admin"}</h1>
        <p className="text-slate-400 mt-2">Here is what&apos;s happening with your portfolio today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass-card p-6 border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Recent Projects</h3>
          <div className="space-y-4">
            {/* Placeholder for real projects */}
            <p className="text-slate-500 text-sm">Project list integration coming next...</p>
          </div>
        </div>

        <div className="glass-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-primary/10 hover:border-primary/20 transition-all text-sm font-medium">
              Add New Project
            </button>
            <button className="p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-primary/10 hover:border-primary/20 transition-all text-sm font-medium">
              Edit Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
