import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  const entry = await prisma.contactMessage.create({
    data: { name, email, subject, message },
  })
  return NextResponse.json(entry, { status: 201 })
}
