"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, X, Loader2, Image as ImageIcon, Upload, Trash2 } from "lucide-react"

const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  technologies: z.string().min(1, "At least one technology required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  slug: z.string().min(1, "Slug is required"),
  imageUrl: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  challenge: z.string().optional(),
  approach: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  testimonial: z.string().optional(),
  highlights: z.string().optional(),
})

interface ProjectFormProps {
  initialData?: any
  categories: any[]
}

export default function ProjectForm({ initialData, categories }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string>(initialData?.imageUrl ?? "")
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData ? {
      ...initialData,
      technologies: (typeof initialData.technologies === "string"
        ? JSON.parse(initialData.technologies)
        : initialData.technologies ?? []
      ).join(", "),
      highlights: (typeof initialData.highlights === "string"
        ? JSON.parse(initialData.highlights)
        : initialData.highlights ?? []
      ).join(", "),
      slug: initialData.slug || "",
      challenge: initialData.challenge || "",
      approach: initialData.approach || "",
      solution: initialData.solution || "",
      results: initialData.results || "",
      testimonial: initialData.testimonial || "",
    } : { published: true, featured: false, slug: "" },
  })

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Upload failed")
      const { url } = await res.json()
      setPreview(url)
      setValue("imageUrl", url)
    } catch {
      alert("Upload failed. Check file size (max 2 MB) and type.")
    } finally {
      setUploading(false)
    }
  }, [setValue])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const clearImage = () => {
    setPreview("")
    setValue("imageUrl", "")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const url = initialData ? `/api/admin/projects/${initialData.id}` : "/api/admin/projects"
      const payload = {
        ...data,
        technologies: data.technologies.split(",").map((s: string) => s.trim()).filter(Boolean),
        highlights: data.highlights ? data.highlights.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      }
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })
      if (res.ok) {
        router.push("/admin/projects")
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(`Failed to save project: ${errorData.error || JSON.stringify(errorData)}`)
      }
    } catch (e) {
      console.error("Failed to save project", e)
      alert("Network error: Failed to reach the server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column */}
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Description (Short)</label>
              <textarea
                {...register("description")}
                rows={3}
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
                placeholder="React, Next.js, Tailwind…"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL <span className="text-slate-500 font-normal">(Optional)</span></label>
                <input {...register("githubUrl")} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Live Demo URL <span className="text-slate-500 font-normal">(Optional)</span></label>
                <input {...register("liveUrl")} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug</label>
              <input
                {...register("slug")}
                placeholder="e.g. immo-lamis"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{String(errors.slug.message)}</p>}
            </div>
          </div>
          
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Case Study Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">The Challenge <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea {...register("challenge")} rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Our Approach <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea {...register("approach")} rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">The Solution <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea {...register("solution")} rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Key Highlights <span className="text-slate-500 font-normal">(Optional, comma separated)</span></label>
              <input {...register("highlights")} placeholder="Feature 1, Feature 2..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">The Results <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea {...register("results")} rows={3} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Client Testimonial <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea {...register("testimonial")} rows={2} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Project Image</h3>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />

            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video group">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                    title="Change image"
                  >
                    <Upload size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="p-2.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                    title="Remove image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-slate-700 bg-slate-900 hover:border-primary/50 hover:bg-slate-800/50"
                }`}
              >
                {uploading ? (
                  <Loader2 size={36} className="animate-spin text-primary mb-3" />
                ) : (
                  <ImageIcon size={36} strokeWidth={1} className="text-slate-600 mb-3" />
                )}
                <p className="text-sm text-slate-400">
                  {uploading ? "Uploading…" : "Click to upload or drag & drop"}
                </p>
                <p className="text-xs text-slate-600 mt-1">PNG, JPG, WEBP — max 2 MB</p>
              </div>
            )}

            {/* Hidden imageUrl field keeps value in sync with react-hook-form */}
            <input type="hidden" {...register("imageUrl")} />

            <div>
              <label className="block text-xs text-slate-500 mb-1">Or paste an image URL (Optional)</label>
              <input
                placeholder="https://..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white text-sm outline-none"
                value={preview}
                onChange={(e) => {
                  setPreview(e.target.value)
                  setValue("imageUrl", e.target.value)
                }}
              />
            </div>
          </div>

          <div className="glass-card p-6 border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>

            <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
              <div>
                <p className="text-sm font-bold text-white">Publicly Visible</p>
                <p className="text-xs text-slate-500">Show this project on the home page</p>
              </div>
              <input type="checkbox" {...register("published")} className="w-5 h-5 accent-primary" />
            </label>

            <label className="flex items-center justify-between p-4 rounded-lg bg-white/5 cursor-pointer">
              <div>
                <p className="text-sm font-bold text-white">Featured Project</p>
                <p className="text-xs text-slate-500">Large layout in the Bento grid</p>
              </div>
              <input type="checkbox" {...register("featured")} className="w-5 h-5 accent-primary" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-800">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 px-6 py-3 rounded-lg text-slate-400 hover:text-white transition-all">
          <X size={20} /> Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary py-3 px-10 disabled:opacity-50">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {initialData ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  )
}
