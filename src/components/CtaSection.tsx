"use client"

import { motion } from "framer-motion"
import { Calendar, Mail } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-3xl text-center shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            Ready to Build?
          </h2>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's talk about your digital product. We'll help you understand options, timeline, and investment. No pressure, no sales pitch—just honest conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="btn-primary w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-base"
            >
              <Calendar size={20} /> Schedule Free Consultation
            </a>
            <a 
              href="mailto:hello@marrok.org" 
              className="btn-outline w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-base bg-white/5 border-white/10 hover:bg-white/10 text-white"
            >
              <Mail size={20} /> Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
