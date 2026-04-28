import { getCategories } from "@/lib/data"
import ProjectForm from "@/components/admin/ProjectForm"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id }
  })

  if (!project) {
    notFound()
  }

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
        <h1 className="text-3xl font-display font-bold text-white">Edit Project</h1>
        <p className="text-slate-400 mt-2">Modify the details of {project.title}.</p>
      </header>

      <ProjectForm initialData={project} categories={categories} />
    </div>
  )
}
