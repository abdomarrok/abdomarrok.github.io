import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  try {
    const body = await req.json()
    const project = await prisma.project.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(project)
  } catch (err) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  try {
    await prisma.project.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { category: true },
    })
    return NextResponse.json(project)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}
