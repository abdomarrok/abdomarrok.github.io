import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { order: "asc" },
  })
  return NextResponse.json(projects)
}
