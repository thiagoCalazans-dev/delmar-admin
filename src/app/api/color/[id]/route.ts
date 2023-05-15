import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

interface params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: params) {
  const id = params.id;
  const color = await prisma.color.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return NextResponse.json(color);
}

export async function PUT(request: Request, { params }: params) {
  const id = params.id;
  const data = await request.json();

  const updatedColor = await prisma.color.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });

  return NextResponse.json(updatedColor);
}

export async function DELETE(request: Request, { params }: params) {
  const id = params.id;
  const deletedColor = await prisma.color.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return NextResponse.json(deletedColor);
}
