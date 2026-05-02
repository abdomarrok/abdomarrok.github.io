"use client"

import { motion } from "framer-motion"
import { PenTool, Code, LineChart, Layers, ArrowRight } from "lucide-react"

const services = [
  {
    icon: <PenTool size={24} className="text-primary" />,
    title: "Digital Product Design",
    description: "UX/UI design, design systems, prototyping & user testing. Deliverable: Figma files & prototypes.",
  },
  {
    icon: <Code size={24} className="text-secondary" />,
    title: "Product Development",
    description: "Frontend (React/Next.js), Backend (Node.js/APIs), Mobile Apps, and Cloud Infrastructure scaling.",
  },
  {
    icon: <LineChart size={24} className="text-accent" />,
    title: "Digital Strategy",
    description: "Market research, product roadmapping, tech stack selection, and post-launch optimization.",
  },
  {
    icon: <Layers size={24} className="text-primary" />,
    title: "End-to-End Products",
    description: "From idea to launch. Full ownership of the project with ongoing support & maintenance.",
  }
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              What We Do
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 leading-relaxed"
            >
              We handle everything from strategy to launch to ongoing optimization. Or pick specific services. Your choice.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="/services" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
              View all services <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900 border border-white/10 hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 font-display">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-primary transition-colors">
                    Learn More <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
