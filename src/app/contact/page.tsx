import Navbar from "@/components/Navbar"
import ContactSection from "@/components/contact/ContactSection"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 bg-slate-950">
      <Navbar />
      
      {/* We can just render the ContactSection directly here as it's fully self-contained */}
      <div className="flex-grow flex items-center">
        <ContactSection />
      </div>
    </div>
  )
}
