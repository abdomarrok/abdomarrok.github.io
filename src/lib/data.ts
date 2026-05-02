import prisma from "@/lib/prisma"

export async function getProjects() {
  return await prisma.project.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { order: "asc" },
  })
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
    include: { category: true },
  })
}

export async function getCategories() {
  return await prisma.category.findMany({
    include: { _count: { select: { projects: true } } },
  })
}

