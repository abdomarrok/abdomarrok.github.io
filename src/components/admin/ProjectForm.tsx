"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, X, Loader2, Image as ImageIcon } from "lucide-react"

const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  technologies: z.string().min(1, "At least one technology required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
})

interface ProjectFormProps {
  initialData?: any
  categories: any[]
}

export default function ProjectForm({ initialData, categories }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      ...initialData,
      technologies: (typeof initialData.technologies === "string"
        ? JSON.parse(initialData.technologies)
        : initialData.technologies ?? []
      ).join(", "),
    } : {
      published: true,
      featured: false,
    },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const url = initialData 
        ? `/api/admin/projects/${initialData.id}` 
        : "/api/admin/projects"
      
      const payload = {
        ...data,
        technologies: data.technologies.split(",").map((s: string) => s.trim()).filter(Boolean),
      }
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        router.push("/admin/projects")
        router.refresh()
      }
    } catch (err) {
      console.error("Failed to save project")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Basics */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
              <input 
                {...register("title")}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{String(errors.title.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea 
                {...register("description")}
                rows={5}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{String(errors.description.message)}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select 
                {...register("categoryId")}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Links & Tech</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Technologies (comma separated)</label>
              <input 
                {...register("technologies")}
                placeholder="React, Next.js, Tailwind..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
                <input 
                  {...register("githubUrl")}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Live Demo URL</label>
                <input 
                  {...register("liveUrl")}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Assets & Status */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Project Image</h3>
            
            <div className="aspect-video rounded-xl bg-slate-900 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 hover:border-primary/50 hover:bg-slate-800/50 transition-all cursor-pointer">
              <ImageIcon size={48} strokeWidth={1} className="mb-4" />
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs mt-1">PNG, JPG or WEBP (Max 2MB)</p>
            </div>
            
            <input 
              {...register("imageUrl")}
              placeholder="Or enter image URL manually"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white text-sm outline-none"
            />
          </div>

          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div>
                <p className="text-sm font-bold text-white">Publicly Visible</p>
                <p className="text-xs text-slate-500">Show this project on the home page</p>
              </div>
              <input type="checkbox" {...register("published")} className="w-5 h-5 accent-primary" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
              <div>
                <p className="text-sm font-bold text-white">Featured Project</p>
                <p className="text-xs text-slate-500">Large layout in the Bento grid</p>
              </div>
              <input type="checkbox" {...register("featured")} className="w-5 h-5 accent-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-all"
        >
          <X size={20} /> Cancel
        </button>
        <button 
          type="submit"
          disabled={isLoading}
          className="btn-primary py-3 px-10 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {initialData ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  )
}
