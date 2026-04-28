import { getSkills } from "@/lib/data"
import { Code2, Database, ShieldCheck, Terminal, Layers } from "lucide-react"

const categoryIcons: Record<string, any> = {
  Frontend: <Terminal size={24} />,
  Backend: <Code2 size={24} />,
  Database: <Database size={24} />,
  Security: <ShieldCheck size={24} />,
  Architecture: <Layers size={24} />,
}

export default async function SkillsSection() {
  const skills = await getSkills()
  
  // Group skills by category
  const categories = skills.reduce((acc: any, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Technical Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white">
            Core Competencies
          </h3>
          <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.keys(categories).map((catName) => (
            <div key={catName} className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {categoryIcons[catName] || <Terminal size={24} />}
                </div>
                <h4 className="text-xl font-bold font-display">{catName}</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {categories[catName].map((skill: any) => (
                  <div 
                    key={skill.id} 
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
