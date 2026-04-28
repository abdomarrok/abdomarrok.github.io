"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit2, Trash2, ExternalLink, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/admin/projects")
        const data = await res.json()
        setProjects(data)
      } catch (err) {
        console.error("Failed to fetch projects")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      } else {
        alert("Failed to delete project")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert("An error occurred while deleting")
    }
  }

  return (
    <div className="p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Manage Projects</h1>
          <p className="text-slate-400 mt-2">Add, edit, or remove projects from your portfolio.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="btn-primary py-3 px-6"
        >
          <Plus size={20} /> Add New Project
        </Link>
      </header>

      {/* Toolbar */}
      <div className="glass-card p-4 border-white/5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span>Total: {projects.length} projects</span>
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-card border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-slate-300 font-bold text-xs uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-slate-300 font-bold text-xs uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-slate-300 font-bold text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-slate-300 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading projects...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">No projects found. Add your first one!</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                          <img src={project.imageUrl || "/images/dashboard.webp"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{project.title}</p>
                          <p className="text-slate-500 text-xs truncate max-w-[200px]">{project.technologies.join(", ")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="px-2 py-1 rounded text-[10px] font-bold uppercase"
                        style={{ backgroundColor: `${project.category?.color}20`, color: project.category?.color }}
                      >
                        {project.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {project.published ? (
                        <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-medium">
                          <Eye size={14} /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                          <EyeOff size={14} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/projects/edit/${project.id}`}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
