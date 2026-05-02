"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Monitor, Layout, Rocket } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          AVAILABLE FOR NEW PROJECTS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-6"
        >
          Enterprise-Quality <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Digital Products
          </span>
          <br className="hidden md:block" /> for MENA SMBs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          <strong className="text-slate-200">Speed. Quality. Affordability. Partnership.</strong> We combine all four—unlike big agencies or freelancers. <br className="hidden md:block" />
          Marrok builds digital products for ambitious French and Arabic-speaking businesses across North Africa and the Middle East. We move fast without cutting corners, understand your market, and deliver outcomes that matter: user engagement, revenue growth, competitive advantage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary w-full md:w-auto px-8 py-4">
            <Rocket size={20} /> Let's Talk
          </a>
          <a href="#work" className="btn-outline w-full md:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10">
            See Our Work <ArrowRight size={20} />
          </a>
        </motion.div>


      </div>
    </section>
  )
}
