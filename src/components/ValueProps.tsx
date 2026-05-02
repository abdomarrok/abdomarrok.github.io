"use client"

import { motion } from "framer-motion"
import { Zap, Award, Coins, Handshake } from "lucide-react"

const valueProps = [
  {
    icon: <Zap size={32} className="text-primary" />,
    title: "SPEED",
    description: "We move fast with agile methodology. 4-8 weeks from discovery to launch."
  },
  {
    icon: <Award size={32} className="text-secondary" />,
    title: "QUALITY",
    description: "Enterprise-grade execution. Polished design, scalable code, zero shortcuts."
  },
  {
    icon: <Coins size={32} className="text-accent" />,
    title: "AFFORDABILITY",
    description: "$15K-50K projects, not $100K+. Same quality, better value."
  },
  {
    icon: <Handshake size={32} className="text-primary" />,
    title: "PARTNERSHIP",
    description: "Your success is our success. Collaborative process, transparent communication."
  }
]

export default function ValueProps() {
  return (
    <section className="py-20 bg-slate-900/50 border-y border-white/5 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {prop.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3 font-display tracking-tight">
                {prop.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
