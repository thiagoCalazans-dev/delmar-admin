import { Color } from "@/app/admin/colors/components/columns";
import { prisma } from "@/libs/prisma";

export async function getColors() {
  return await prisma.color.findMany();
}

export async function getColorbyId(id: string) {
  return await prisma.color.findUnique({
    where: {
      id: parseInt(id, 10),
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

export async function updateColor(id: string, data: Color) {
  return await prisma.color.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
}

export async function deleteColor(id: string) {
  return await prisma.color.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}
