"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit2, Trash2, Tag } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete")
      }
    } catch (e) {
      alert("Failed to delete category")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Categories</h1>
          <p className="text-slate-400">Manage project categories and tags.</p>
        </div>
        <Link 
          href="/admin/categories/new" 
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          New Category
        </Link>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Slug</th>
                <th className="p-4 font-medium">Projects Count</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No categories found. Create one!</td></tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color || '#3b82f6' }} />
                        <span className="font-medium text-white">{cat.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-sm">{cat.slug}</td>
                    <td className="p-4 text-slate-400">
                      <span className="inline-flex items-center justify-center bg-slate-800 px-3 py-1 rounded-full text-xs font-bold">
                        {cat._count?.projects || 0}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/categories/edit/${cat.id}`}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
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
