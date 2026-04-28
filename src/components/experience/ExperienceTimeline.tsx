import { getExperience } from "@/lib/data"
import { Calendar, Briefcase, GraduationCap } from "lucide-react"

export default async function ExperienceTimeline() {
  const experiences = await getExperience()

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Journey</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white">
            Experience & Education
          </h3>
          <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              const isJob = exp.type === 'job'

              return (
                <div key={exp.id} className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                  {/* Content Container */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:order-last md:text-left'}`}>
                    <div className="glass-card p-6 border-white/5 hover:border-primary/20 transition-all group">
                      <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {isJob ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                        </div>
                        <h4 className="text-xl font-bold text-white font-display">{exp.title}</h4>
                      </div>
                      
                      <p className="text-primary text-sm font-medium mb-3">{exp.company}</p>
                      
                      <div className={`flex items-center gap-2 text-slate-500 text-xs mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Calendar size={14} />
                        {new Date(exp.startDate).getFullYear()} — {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : ''}
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot on line */}
                  <div className="absolute left-0 md:left-1/2 top-10 md:top-1/2 w-4 h-4 rounded-full bg-primary border-4 border-slate-950 -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  
                  {/* Spacer for other side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
