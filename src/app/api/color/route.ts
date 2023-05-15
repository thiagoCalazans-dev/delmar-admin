import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const colors = await prisma.color.findMany();
  return NextResponse.json(colors, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const color = await prisma.color.create({
    data: {
      name,
    },
  });

  return NextResponse.json(color, { status: 201 });
}
