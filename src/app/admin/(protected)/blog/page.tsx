"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit2, Trash2, Globe, EyeOff } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog")
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" })
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id))
      }
    } catch (e) {
      alert("Failed to delete post")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-slate-400">Manage your markdown blog posts.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No posts found. Create one!</td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-white">{post.title}</p>
                      <p className="text-slate-400 text-sm truncate max-w-[200px]">{post.slug}</p>
                    </td>
                    <td className="p-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                          <Globe size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
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
