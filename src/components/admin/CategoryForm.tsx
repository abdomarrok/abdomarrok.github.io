"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  color: z.string().optional(),
})

type CategoryFormProps = {
  initialData?: any
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || { name: "", slug: "", color: "#3b82f6" },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const url = initialData ? `/api/admin/categories/${initialData.id}` : "/api/admin/categories"
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        router.push("/admin/categories")
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(`Failed to save category: ${errorData.error || JSON.stringify(errorData)}`)
      }
    } catch (e) {
      console.error("Failed to save category", e)
      alert("Network error: Failed to reach the server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white">
            {initialData ? "Edit Category" : "New Category"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
          <input
            {...register("name")}
            placeholder="e.g. Web Development"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug</label>
          <input
            {...register("slug")}
            placeholder="e.g. web-development"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
          />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{String(errors.slug.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Color (Hex code)</label>
          <div className="flex gap-4">
            <input
              type="color"
              {...register("color")}
              className="h-12 w-12 rounded-lg cursor-pointer bg-slate-900 border border-slate-800"
            />
            <input
              {...register("color")}
              placeholder="#3b82f6"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary/50 outline-none uppercase"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
          <Link
            href="/admin/categories"
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
            Save Category
          </button>
        </div>
      </form>
    </div>
  )
}
