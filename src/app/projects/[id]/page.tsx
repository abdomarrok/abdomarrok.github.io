import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, GitFork, PlayCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return { title: "Not Found" }
  return { title: `${project.title} — Marrok Abderrahmane` }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id, published: true },
    include: { category: true },
  })

  if (!project) notFound()

  const technologies: string[] = typeof project.technologies === "string"
    ? JSON.parse(project.technologies)
    : project.technologies ?? []

  const highlights: string[] = typeof project.highlights === "string"
    ? JSON.parse(project.highlights)
    : project.highlights ?? []

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-8">
          {project.category && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-4"
              style={{ backgroundColor: project.category.color ?? "var(--color-primary)" }}
            >
              {project.category.name}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">{project.title}</h1>
          <p className="text-xl text-slate-400 leading-relaxed">{project.description}</p>
        </div>

        {/* Image */}
        {project.imageUrl && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-10 aspect-video">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary py-2.5 px-5 text-sm">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-sm"
            >
              <GitFork size={16} /> Source Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-5 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-sm"
            >
              <PlayCircle size={16} /> Video Demo
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Long description */}
          <div className="md:col-span-2 space-y-6">
            {project.longDescription && (
              <div className="glass-card p-6 border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">About this project</h2>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="glass-card p-6 border-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tech stack */}
          <div className="glass-card p-6 border-white/5 h-fit">
            <h2 className="text-lg font-bold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
