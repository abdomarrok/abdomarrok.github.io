import { Award, ExternalLink } from "lucide-react"

const certs = [
  {
    name: "Blockchain Basics",
    issuer: "Coursera",
    year: "2023",
    color: "#f59e0b",
    href: "#",
  },
  {
    name: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    year: "2023",
    color: "#76b900",
    href: "#",
  },
  {
    name: "AWS Machine Learning Foundations",
    issuer: "Udacity",
    year: "2022",
    color: "#ff9900",
    href: "#",
  },
  {
    name: "SEO Manager Certification",
    issuer: "Blue Array Academy",
    year: "2022",
    color: "#3b82f6",
    href: "#",
  },
]

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-slate-900/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Credentials</h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white">Certifications</h3>
          <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certs.map((cert, i) => (
            <div
              key={cert.name}
              className="glass-card p-6 border-white/5 hover:border-white/15 transition-all group flex flex-col gap-4"
            >
              <div className="p-3 rounded-xl w-fit" style={{ backgroundColor: `${cert.color}18` }}>
                <Award size={24} style={{ color: cert.color }} />
              </div>
              <div className="flex-grow">
                <p className="text-white font-bold text-sm leading-snug mb-1">{cert.name}</p>
                <p className="text-slate-500 text-xs">{cert.issuer} · {cert.year}</p>
              </div>
              {cert.href !== "#" && (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Verify <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
