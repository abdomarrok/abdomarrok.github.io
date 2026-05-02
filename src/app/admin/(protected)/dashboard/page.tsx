export const dynamic = "force-dynamic"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Briefcase, Code, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  const [projectCount, categoryCount, postCount, messageCount, unreadCount, recentMessages] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.post.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ])

  const stats = [
    { label: "Projects", value: projectCount, icon: Briefcase, color: "text-blue-500", href: "/admin/projects" },
    { label: "Categories", value: categoryCount, icon: Code, color: "text-emerald-500", href: "/admin/categories" },
    { label: "Blog Posts", value: postCount, icon: Clock, color: "text-orange-500", href: "/admin/blog" },
    { label: "Messages", value: messageCount, icon: MessageSquare, color: "text-purple-500", href: "/admin/messages" },
  ]

  return (
    <div className="p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "Admin"}
        </h1>
        <p className="text-slate-400 mt-2">Here is what&apos;s happening with your portfolio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="glass-card p-6 border-white/5 hover:border-white/10 transition-all"
            >
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color} w-fit mb-4`}>
                <Icon size={20} />
              </div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Messages</h3>
            <Link href="/admin/messages" className="text-primary text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-slate-500 text-sm">No messages yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.read ? "bg-slate-600" : "bg-primary"}`} />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{msg.name}</p>
                    <p className="text-slate-500 text-xs truncate">{msg.subject}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card p-6 border-white/5">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Add Project", href: "/admin/projects/new" },
              { label: "Write Post", href: "/admin/blog/new" },
              { label: "View Messages", href: "/admin/messages" },
              { label: "Settings", href: "/admin/settings" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="p-4 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-primary/10 hover:border-primary/20 transition-all text-sm font-medium text-center"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
