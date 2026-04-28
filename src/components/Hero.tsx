"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, DesktopTower, Layout, Rocket } from "lucide-react"

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
          className="text-4xl md:text-7xl font-display font-black tracking-tight mb-6"
        >
          Building High-Performance <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Desktop & Web Software
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Specializing in JavaFX 17+, Spring Boot, and Next.js 15. <br className="hidden md:block" />
          I bridge the gap between enterprise desktop reliability and modern web excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-primary w-full md:w-auto px-8 py-4">
            <Rocket size={20} /> View My Work
          </a>
          <a href="#contact" className="btn-outline w-full md:w-auto px-8 py-4 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10">
            Let&apos;s Talk <ArrowRight size={20} />
          </a>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-4 text-slate-500"
        >
          {[
            { icon: <Code2 size={16} />, label: "JavaFX" },
            { icon: <Layout size={16} />, label: "Next.js" },
            { icon: <Layout size={16} />, label: "React" },
            { icon: <Code2 size={16} />, label: "Spring Boot" },
            { icon: <Rocket size={16} />, label: "NestJS" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:border-white/10 hover:text-slate-300 transition-all cursor-default">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
