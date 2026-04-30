"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: any
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isLarge = index === 0 || project.featured
  const technologies: string[] = typeof project.technologies === "string"
    ? JSON.parse(project.technologies)
    : project.technologies ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative glass-card overflow-hidden flex flex-col",
        isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1"
      )}
    >
      {/* Image Overlay */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all z-10" />
        <img
          src={project.imageUrl || "/legacy-v1/images/dashboard.webp"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div 
          className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
          style={{ backgroundColor: project.category?.color || "var(--color-primary)" }}
        >
          {project.category?.name}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <h3 className={cn(
            "font-display font-bold text-white",
            isLarge ? "text-2xl" : "text-xl"
          )}>
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                <Code size={18} />
              </Link>
            )}
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                <ExternalLink size={18} />
              </Link>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.slice(0, isLarge ? 6 : 3).map((tech: string) => (
            <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300">
              {tech}
            </span>
          ))}
          {!isLarge && technologies.length > 3 && (
            <span className="text-[10px] text-slate-500 font-medium">+{technologies.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Hover Arrow — links to detail page */}
      <Link
        href={`/projects/${project.id}`}
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary"
        title="View project"
      >
        <ArrowUpRight size={24} />
      </Link>
    </motion.div>
  )
}
