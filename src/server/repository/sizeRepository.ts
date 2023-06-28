import { prisma } from "@/utils/libs/prisma";
import { Size } from "@prisma/client";

export async function getSizes() {
  return await prisma.size.findMany();
}

export async function getSizebyId(id: number) {
  return await prisma.size.findUnique({
    where: {
      id,
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

export async function updateSize(id: number, data: Size) {
  return await prisma.size.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteSize(id: number) {
  return await prisma.size.delete({
    where: {
      id,
    },
  });
}
