export const dynamic = "force-dynamic"

import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ValueProps from "@/components/ValueProps"
import ServicesOverview from "@/components/ServicesOverview"
import ProjectGrid from "@/components/projects/ProjectGrid"
import FaqSection from "@/components/FaqSection"
import CtaSection from "@/components/CtaSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <ValueProps />
      <ServicesOverview />
      <ProjectGrid />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
