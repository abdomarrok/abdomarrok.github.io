"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, Code, MessageSquare, Clock, Settings, LogOut, ChevronRight } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const adminLinks = [
  { name: "Dashboard",  href: "/admin/dashboard",  icon: LayoutDashboard },
  { name: "Projects",   href: "/admin/projects",   icon: Briefcase },
  { name: "Skills",     href: "/admin/skills",     icon: Code },
  { name: "Experience", href: "/admin/experience", icon: Clock },
  { name: "Messages",   href: "/admin/messages",   icon: MessageSquare },
  { name: "Settings",   href: "/admin/settings",   icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 h-screen sticky top-0">
      <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
        <div className="w-2 h-8 bg-primary rounded-full" />
        Marrok Admin
      </h2>
      
      <nav className="flex flex-col gap-2">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                {link.name}
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  )
}
