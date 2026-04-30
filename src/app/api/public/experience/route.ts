import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } })
  return NextResponse.json(experience)
}
