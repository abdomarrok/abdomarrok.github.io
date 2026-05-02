const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  const project = await prisma.project.findFirst()
  if (!project) return console.log("No projects found")

  try {
    const data = {
      title: project.title + " edited",
      description: project.description,
      categoryId: project.categoryId,
      technologies: "[\"React\"]",
      slug: project.slug,
      imageUrl: project.imageUrl || "",
      published: true,
      featured: false,
      challenge: "",
      approach: "",
      solution: "",
      results: "",
      testimonial: "",
      highlights: "[]"
    }

    const res = await prisma.project.update({
      where: { id: project.id },
      data
    })
    console.log("Success:", res.id)
  } catch (e) {
    console.error("Prisma Error:", e)
  }
}

test().finally(() => prisma.$disconnect())
