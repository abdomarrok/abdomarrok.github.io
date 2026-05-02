const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Get an existing category ID (e.g., Web)
  const category = await prisma.category.findFirst({
    where: { name: 'Web' }
  })

  if (!category) {
    console.error("No category found!")
    return
  }

  const project = await prisma.project.create({
    data: {
      title: "Marrok AI Agent Platform",
      slug: "marrok-ai-platform",
      description: "An intelligent autonomous agent platform for executing complex software engineering tasks.",
      categoryId: category.id,
      published: true,
      featured: true,
      technologies: JSON.stringify(["Next.js 16", "React 19", "Prisma", "PostgreSQL"]),
      highlights: JSON.stringify(["Autonomous execution engine", "Self-healing database schemas", "Real-time DOM analysis"]),
      challenge: "The client needed a way to automate complex software engineering tasks without having to manually intervene at every step. Existing solutions were too brittle and required constant hand-holding.",
      approach: "We designed a multi-agent system where specialized sub-agents handle specific domains (like browser automation or file parsing), while a master agent orchestrates the high-level plan.",
      solution: "We built the Marrok AI Agent Platform. It features a fully reactive Next.js 16 dashboard where users can monitor agent execution in real-time. The agents operate autonomously, reading DOM states, capturing screenshots, and writing code.",
      results: "Development velocity increased by 400%.\nMean time to resolution (MTTR) for bugs decreased from 24 hours to 5 minutes.\nZero manual regressions in the last 6 months.",
      testimonial: "This platform completely revolutionized how we ship software. It's like having a senior engineer working 24/7.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
    }
  })

  console.log("Successfully created dummy project:", project.slug)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
