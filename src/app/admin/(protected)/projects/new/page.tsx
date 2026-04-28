import { getCategories } from "@/lib/data"
import ProjectForm from "@/components/admin/ProjectForm"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function NewProjectPage() {
  const categories = await getCategories()

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Link 
        href="/admin/projects" 
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-all mb-6 text-sm group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>
      
      <header className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">Create New Project</h1>
        <p className="text-slate-400 mt-2">Fill in the details below to add a new project to your portfolio.</p>
      </header>

      <ProjectForm categories={categories} />
    </div>
  )
}
