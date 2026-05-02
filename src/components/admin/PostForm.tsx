"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(10, "Content is required"),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  author: z.string().default("Marrok"),
})

export default function PostForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || { published: false, author: "Marrok" },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const url = initialData ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog"
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        router.push("/admin/blog")
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(`Failed to save post: ${errorData.error || JSON.stringify(errorData)}`)
      }
    } catch (e) {
      console.error("Failed to save post", e)
      alert("Network error: Failed to reach the server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white">
            {initialData ? "Edit Post" : "New Post"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6 bg-slate-900/50 border border-white/5 rounded-3xl p-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
              <input
                {...register("title")}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt (1-2 sentences)</label>
              <textarea
                {...register("excerpt")}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
              {errors.excerpt && <p className="text-red-500 text-xs mt-1">{String(errors.excerpt.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown supported)</label>
              <textarea
                {...register("content")}
                rows={15}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none font-mono text-sm"
              />
              {errors.content && <p className="text-red-500 text-xs mt-1">{String(errors.content.message)}</p>}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>
              
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div>
                  <p className="text-white font-medium">Published</p>
                  <p className="text-slate-400 text-xs">Make post live</p>
                </div>
                <input type="checkbox" {...register("published")} className="w-5 h-5 accent-primary" />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Meta Data</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug</label>
                <input
                  {...register("slug")}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{String(errors.slug.message)}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                <input
                  {...register("author")}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL (Optional)</label>
                <input
                  {...register("coverImage")}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-6 py-3 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Post
          </button>
        </div>
      </form>
    </div>
  )
}
