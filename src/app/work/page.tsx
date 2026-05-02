import { getProjects } from "@/lib/data"
import ProjectCard from "@/components/projects/ProjectCard"
import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col min-h-screen pt-24">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-slate-900/30 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight">
            Work We're Proud Of
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Here's what we've built. Each project taught us something. See how we deliver quality, speed, and partnership.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-CTA */}
      <section className="py-20 border-t border-white/5 bg-slate-900/50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            Your project could be here.
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium text-lg">
            Let's talk <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
