import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProjectGrid from "@/components/projects/ProjectGrid"
import SkillsSection from "@/components/skills/SkillsSection"
import ExperienceTimeline from "@/components/experience/ExperienceTimeline"
import CertificationsSection from "@/components/certifications/CertificationsSection"
import ContactSection from "@/components/contact/ContactSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ProjectGrid />
      <SkillsSection />
      <ExperienceTimeline />
      <CertificationsSection />
      <ContactSection />
    </div>
  )
}
