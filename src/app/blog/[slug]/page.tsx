import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Navbar from "@/components/Navbar"
import CtaSection from "@/components/CtaSection"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

// Optional: Custom components to pass to MDXRemote to style standard markdown tags
const mdxComponents = {
  h2: (props: any) => <h2 className="text-3xl font-display font-bold text-white mt-12 mb-6" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="text-slate-300 leading-relaxed mb-6 text-lg" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-300 text-lg" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-300 text-lg" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  em: (props: any) => <em className="italic text-slate-400" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-slate-400 text-xl" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-slate-800/80 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-slate-900 p-6 rounded-2xl border border-white/10 overflow-x-auto mb-8 text-sm" {...props} />
  ),
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-slate-950">
      <Navbar />

      {/* Back Link */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to all articles
        </Link>
      </div>

      {/* Header */}
      <article className="pb-24">
        <header className="container mx-auto px-4 max-w-3xl mb-16 text-center">
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500 mb-8">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              <Tag size={16} />
              Insight
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-8 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto italic">
            {post.excerpt}
          </p>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mdx-content">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>

      <CtaSection />
    </div>
  )
}
