import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProjectGrid from "@/components/projects/ProjectGrid"
import SkillsSection from "@/components/skills/SkillsSection"
import ExperienceTimeline from "@/components/experience/ExperienceTimeline"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ProjectGrid />
      <SkillsSection />
      <ExperienceTimeline />
      
      {/* Placeholder for contact */}
    </div>
  )
}
