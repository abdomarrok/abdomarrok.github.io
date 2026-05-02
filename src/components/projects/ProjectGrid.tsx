import { getProjects } from "@/lib/data"
import ProjectCard from "./ProjectCard"

export default async function ProjectGrid() {
  const projects = (await getProjects()).slice(0, 3)

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Case Studies</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white">
            Work We're Proud Of
          </h3>
          <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
