import prisma from "@/lib/prisma"

export async function getProjects() {
  return await prisma.project.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { order: "asc" },
  })
}

export async function getCategories() {
  return await prisma.category.findMany({
    include: { _count: { select: { projects: true } } },
  })
}

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: { order: "asc" },
  })
}

export async function getExperience() {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" },
  })
}
