import { prisma } from "@/libs/prisma";
import { Size } from "@prisma/client";

export async function getSizes() {
  return await prisma.size.findMany();
}

export async function getSizebyId(id: string) {
  return await prisma.size.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
}

export async function createSize(name: string) {
  return await prisma.size.create({
    data: {
      name,
    },
  });
}

export async function updateSize(id: string, data: Size) {
  return await prisma.size.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
}

export async function deleteSize(id: string) {
  return await prisma.size.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}
