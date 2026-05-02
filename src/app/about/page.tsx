import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import ExperienceTimeline from "@/components/legacy-v2/experience/ExperienceTimeline"
import CertificationsSection from "@/components/legacy-v2/certifications/CertificationsSection"
import { CheckCircle2, User, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-slate-900/30 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight">
            Who Is Marrok
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Marrok is a digital product agency for French and Arabic-speaking SMBs in MENA. We combine speed, quality, affordability, and partnership to build products that matter.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Our Origin Story
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                <p>
                  Abderrahmane (founder) built his first digital product in 2021—a desktop ERP system for Algerian retail businesses. 
                </p>
                <p>
                  He realized there was a huge gap: big agencies were expensive and slow, while freelancers often cut corners. Ambitious SMBs deserved better.
                </p>
                <p>
                  So he started Marrok: a dedicated partner that combines the enterprise-quality of a big agency with the speed and affordability of a startup.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900/80 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]" />
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="text-primary" /> The Team
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Right now it's just Abderrahmane. I work with trusted partners on larger projects, which lets me scale without sacrificing quality. You get direct access to the founder on every single project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              What We Believe
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Speed and quality aren't opposed—they're complementary.",
              "Cultural fluency matters (Arabic, French, local market knowledge).",
              "Digital products should generate measurable business outcomes.",
              "The best products come from partnership, not just vendor relationships.",
              "Affordability doesn't mean cheap—it means fair pricing."
            ].map((belief, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="text-slate-200 text-lg">{belief}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg text-slate-400">Everything we do follows a clear path to success.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "Discovery", desc: "Understand your needs" },
              { step: 2, title: "Strategy", desc: "Recommend approach" },
              { step: 3, title: "Design", desc: "Create beauty" },
              { step: 4, title: "Development", desc: "Build reliability" },
              { step: 5, title: "Launch", desc: "Ship with confidence" },
              { step: 6, title: "Support", desc: "Grow together" }
            ].map((p) => (
              <div key={p.step} className="p-6 border border-white/10 rounded-2xl text-center relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="text-5xl font-display font-black text-white/5 mb-4 group-hover:text-primary/10 transition-colors">
                  0{p.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials (Legacy) */}
      <div className="bg-slate-900/30 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl text-center pt-24 pb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Our Credentials
          </h2>
          <p className="text-lg text-slate-400">5+ years building digital products. 100K+ users across platforms.</p>
        </div>
        <ExperienceTimeline />
        <CertificationsSection />
      </div>

      <CtaSection />
    </div>
  )
}
