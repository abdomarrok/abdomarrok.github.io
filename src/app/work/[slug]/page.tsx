import { notFound } from "next/navigation"
import { getProjectBySlug } from "@/lib/data"
import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import { ArrowLeft, CheckCircle2, Quote, ExternalLink, Code } from "lucide-react"
import Link from "next/link"

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const technologies = typeof project.technologies === "string" 
    ? JSON.parse(project.technologies) 
    : project.technologies || []
    
  const highlights = typeof project.highlights === "string"
    ? JSON.parse(project.highlights)
    : project.highlights || []

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-slate-950">
      <Navbar />

      {/* Back Link */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/work" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to all work
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white mb-6 inline-block"
                style={{ backgroundColor: project.category?.color || "var(--color-primary)" }}
              >
                {project.category?.name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" className="btn-primary py-3 px-6 gap-2">
                    <ExternalLink size={18} /> View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" className="btn-outline border-white/10 text-white hover:bg-white/5 py-3 px-6 gap-2">
                    <Code size={18} /> View Source
                  </a>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] bg-slate-900">
                <img 
                  src={project.imageUrl || "/legacy-v1/images/dashboard.webp"} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Meta */}
      <section className="py-12 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Category</span>
              <span className="text-slate-200 font-medium">{project.category?.name}</span>
            </div>
            <div className="md:col-span-3">
              <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl space-y-24">
          
          {/* Legacy Long Description fallback if new fields aren't populated */}
          {(!project.challenge && project.longDescription) && (
            <div className="prose prose-invert prose-lg max-w-none text-slate-400">
              <p>{project.longDescription}</p>
            </div>
          )}

          {project.challenge && (
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-white">The Challenge</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                {project.challenge.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}

          {project.approach && (
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-white">Our Approach</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                {project.approach.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}

          {project.solution && (
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-white">The Solution</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                {project.solution.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              
              {highlights.length > 0 && (
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 mt-8">
                  <h3 className="text-xl font-bold text-white mb-6">Key Features</h3>
                  <ul className="space-y-4">
                    {highlights.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {project.results && (
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-white">The Results</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                {project.results.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}

          {project.testimonial && (
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/20" />
              <Quote className="absolute bottom-8 right-8 w-16 h-16 text-primary/20 rotate-180" />
              <p className="text-xl md:text-3xl font-medium text-white italic leading-relaxed relative z-10">
                "{project.testimonial}"
              </p>
            </div>
          )}
          
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
