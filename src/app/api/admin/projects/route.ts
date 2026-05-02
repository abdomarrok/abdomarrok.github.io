import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { order: "asc" },
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { categoryId, ...rest } = body
  const project = await prisma.project.create({
    data: {
      ...rest,
      category: { connect: { id: categoryId } },
      technologies: JSON.stringify(body.technologies ?? []),
      highlights: JSON.stringify(body.highlights ?? []),
    },
  })
  return NextResponse.json(project, { status: 201 })
}
