import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(experience)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const item = await prisma.experience.create({
    data: {
      ...body,
      skills: JSON.stringify(body.skills ?? []),
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
    },
  })
  return NextResponse.json(item, { status: 201 })
}
