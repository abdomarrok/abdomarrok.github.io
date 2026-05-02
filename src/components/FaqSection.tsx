"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer: "Most projects take 4-8 weeks from discovery to launch, depending on scope. We break work into clear phases with deliverables at each stage."
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer: "We love working with ambitious startups and growing SMBs. Our pricing ($15K-50K per project) is designed for founders and SMB owners who want quality without enterprise agency costs."
  },
  {
    question: "What tech stack do you use?",
    answer: "We choose tools based on your needs, not trends. Frontend: React/Next.js. Backend: Node.js/Spring Boot. Mobile: React Native/native. Databases: PostgreSQL/MySQL. We're platform-agnostic and always recommend what's best for YOUR product."
  },
  {
    question: "Can you work in Arabic/French?",
    answer: "Yes. We build multilingual products as standard. This includes RTL design, localization, regional payment methods, and cultural UX considerations."
  },
  {
    question: "What happens after launch?",
    answer: "We don't disappear. Post-launch support includes monitoring, bug fixes, analytics, and optimization. Most clients work with us ongoing as their product grows."
  },
  {
    question: "How much does it cost?",
    answer: "Projects typically range $15K-50K depending on scope. We offer free 30-min consultations to scope work and provide transparent estimates."
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about working with Marrok.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/10 rounded-2xl bg-slate-900/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="text-lg font-medium text-slate-200">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      isOpen && "transform rotate-180 text-primary"
                    )} 
                  />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
