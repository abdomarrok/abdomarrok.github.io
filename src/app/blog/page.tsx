import { getAllPosts } from "@/lib/mdx"
import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import Link from "next/link"
import { Calendar, Tag, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-slate-950">
      <Navbar />

      {/* Header */}
      <section className="py-20 bg-slate-900/30 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight">
            Insights for MENA SMBs
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Thoughts on digital products, MENA markets, and building better software faster.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2">No posts yet</h2>
              <p className="text-slate-400">Check back soon for new insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6">
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full">
                        <Calendar size={14} />
                        {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        <Tag size={14} />
                        {post.meta.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-primary transition-colors">
                      {post.meta.title}
                    </h2>
                    
                    <p className="text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3">
                      {post.meta.excerpt}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors mt-auto">
                      Read Article <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </div>
  )
}
