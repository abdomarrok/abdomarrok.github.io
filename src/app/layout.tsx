import type { Metadata } from "next";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdomarrok.github.io"),
  title: "Marrok Abderrahmane | Full-Stack Software Engineer",
  description: "Senior Full-Stack Engineer specializing in Enterprise Desktop (JavaFX), Modern Web (Next.js), and 3D Graphics. Building high-performance solutions for global enterprises.",
  keywords: ["JavaFX", "Next.js 15", "React 19", "Spring Boot", "Full-Stack Engineer", "Algeria", "Software Architecture"],
  openGraph: {
    title: "Marrok Abderrahmane | Full-Stack Software Engineer",
    description: "Enterprise Solutions: Desktop, Web, and 3D Graphics.",
    url: "https://marrok.net",
    siteName: "Marrok Portfolio",
    images: [{ url: "/images/profile.jpg", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="font-sans bg-slate-950 text-slate-50 antialiased">
        <div className="relative min-h-screen flex flex-col">
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)]" />
          <AuthProvider>
            <main className="flex-grow">
              {children}
            </main>
          </AuthProvider>
          <footer className="py-12 border-t border-slate-800 text-center text-slate-400">
            <div className="container mx-auto px-4">
              <p>© {new Date().getFullYear()} Marrok Abderrahmane.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
