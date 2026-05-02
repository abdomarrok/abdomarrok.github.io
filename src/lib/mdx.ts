import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  thumbnail?: string
}

export function getPostSlugs() {
  if (!fs.existsSync(contentDir)) {
    return []
  }
  return fs.readdirSync(contentDir)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(contentDir, `${realSlug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    meta: data as PostMeta,
    content,
  }
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    // sort posts by date in descending order
    .sort((post1, post2) => ((post1?.meta.date || '') > (post2?.meta.date || '') ? -1 : 1))
  
  return posts
}
