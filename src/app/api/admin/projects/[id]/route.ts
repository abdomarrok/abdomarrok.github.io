import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id }, include: { category: true } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PATCH(req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = { ...body }
  if (Array.isArray(body.technologies)) data.technologies = JSON.stringify(body.technologies)
  if (Array.isArray(body.highlights)) data.highlights = JSON.stringify(body.highlights)

  const project = await prisma.project.update({ where: { id }, data })
  return NextResponse.json(project)
}

// keep PUT as alias for PATCH so ProjectForm still works
export async function PUT(req: Request, ctx: Ctx) {
  return PATCH(req, ctx)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
