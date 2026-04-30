import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

type Ctx = { params: Promise<{ id: string }> }

export async function PATCH(req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = { ...body }
  if (Array.isArray(body.skills)) data.skills = JSON.stringify(body.skills)
  if (body.startDate) data.startDate = new Date(body.startDate)
  if (body.endDate) data.endDate = new Date(body.endDate)

  const item = await prisma.experience.update({ where: { id }, data })
  return NextResponse.json(item)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.experience.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
