import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, name } = body;

  const color = await prisma.color.create({
    data: {
      name,
    },
  });

  return NextResponse.json(`voce chegou aqui: ${color}`);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id, name } = body;

  const color = await prisma.color.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(`voce chegou aqui: ${color}`);
}
