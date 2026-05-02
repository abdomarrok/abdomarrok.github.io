import { PenTool, Code, LineChart, Layers, CheckCircle2, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import Link from "next/link"

const services = [
  {
    id: "strategy",
    icon: <LineChart className="w-8 h-8 text-accent" />,
    title: "Digital Strategy",
    what: "Research, planning, roadmapping, tech decisions",
    includes: [
      "Market & competitive research",
      "User research & personas",
      "Product roadmapping",
      "Technology stack evaluation",
      "Cost/timeline estimation",
      "Success metrics framework"
    ],
    timeline: "2-4 weeks",
    deliverables: "Strategy document, tech spec, product roadmap",
    bestFor: "\"Want guidance before building\" clients"
  },
  {
    id: "design",
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "Product Design",
    what: "UX/UI design, design systems, prototyping",
    includes: [
      "Wireframing",
      "High-fidelity design",
      "Design system creation",
      "Interaction design",
      "Usability testing",
      "Design-to-dev handoff"
    ],
    timeline: "3-5 weeks",
    deliverables: "Figma files, design system, clickable prototype",
    bestFor: "\"Want beautiful, validated design before dev starts\""
  },
  {
    id: "development",
    icon: <Code className="w-8 h-8 text-secondary" />,
    title: "Product Development",
    what: "Full development, architecture, infrastructure",
    includes: [
      "Frontend development (React/Next.js)",
      "Backend development (APIs, databases)",
      "Mobile development (iOS/Android)",
      "Cloud infrastructure (AWS, Vercel)",
      "Deployment & scaling",
      "Monitoring & optimization"
    ],
    timeline: "4-8 weeks (depending on scope)",
    deliverables: "Deployed product, documentation, handoff",
    bestFor: "\"Have design or plan, need execution\""
  },
  {
    id: "end-to-end",
    icon: <Layers className="w-8 h-8 text-primary" />,
    title: "End-to-End Product",
    what: "Full ownership from discovery to launch + support",
    includes: [
      "Everything above (strategy + design + dev)",
      "Project management",
      "QA & testing",
      "Launch planning",
      "Post-launch optimization",
      "3-6 months ongoing support"
    ],
    timeline: "8-12 weeks",
    deliverables: "Live product, analytics, continued optimization",
    bestFor: "\"Have idea, need partner to own the whole thing\""
  }
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <Navbar />
      
      {/* Header */}
      <section className="py-20 bg-slate-900/30 border-b border-white/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight">
            Services We Offer
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            We handle everything from strategy to launch to ongoing optimization. Or pick specific services. Your choice.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12 md:space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
              >
                {/* Info Column */}
                <div className="md:col-span-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-slate-300 font-medium mb-6">
                    {service.what}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Timeline</span>
                      <span className="text-slate-300 font-medium">{service.timeline}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <span className="block text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">Deliverables</span>
                      <span className="text-slate-300 font-medium">{service.deliverables}</span>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <span className="block text-sm text-primary uppercase font-bold tracking-wider mb-1">Best For</span>
                      <span className="text-primary font-medium">{service.bestFor}</span>
                    </div>
                  </div>
                  
                  <Link href="/contact" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium">
                    Discuss this service <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Features Column */}
                <div className="md:col-span-7 bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12">
                  <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-6">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-slate-900/80 border-t border-white/5 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            Why Marrok for Each Service
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            We don't just execute. We partner. Every project includes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              "Clear communication (no surprises)",
              "Regular reviews & feedback loops",
              "Transparent progress tracking",
              "Flexibility (we adapt when needed)",
              "Post-launch support (we don't disappear)"
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-slate-300 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-center text-white mb-12">
            Service FAQ
          </h2>
          <div className="space-y-6">
            <div className="border border-white/10 p-6 rounded-2xl">
              <h4 className="text-xl font-bold text-slate-200 mb-2">Can I hire you for just design? Just development?</h4>
              <p className="text-slate-400">Yes, absolutely. We're flexible. Pick the services you need.</p>
            </div>
            <div className="border border-white/10 p-6 rounded-2xl">
              <h4 className="text-xl font-bold text-slate-200 mb-2">What if I want design + dev but not strategy?</h4>
              <p className="text-slate-400">You'll still get discovery (understanding your needs). We skip formal strategic documentation and move straight into design.</p>
            </div>
            <div className="border border-white/10 p-6 rounded-2xl">
              <h4 className="text-xl font-bold text-slate-200 mb-2">Do you work on retainers or fixed-price projects?</h4>
              <p className="text-slate-400">Both. Fixed-price works for defined scopes. Retainers work for ongoing optimization & feature releases.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
