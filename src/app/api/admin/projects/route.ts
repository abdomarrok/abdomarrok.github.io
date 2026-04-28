import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(projects)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const project = await prisma.project.create({
      data: {
        ...body,
        // Ensure categoryId is valid if provided
      }
    })
    return NextResponse.json(project)
  } catch (err) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
