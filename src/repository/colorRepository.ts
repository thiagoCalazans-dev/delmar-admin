import { prisma } from "@/libs/prisma";
import { Color } from "@prisma/client";

export async function getColors() {
  return await prisma.color.findMany();
}

export async function getColorbyId(id: number) {
  return await prisma.color.findUnique({
    where: {
      id,
    },
  });
}

export async function createColor(name: string) {
  return await prisma.color.create({
    data: {
      name,
    },
  });
}

export async function updateColor(id: number, data: Color) {
  return await prisma.color.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteColor(id: number) {
  return await prisma.color.delete({
    where: {
      id,
    },
  });
}
