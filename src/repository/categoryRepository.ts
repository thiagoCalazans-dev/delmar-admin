import { prisma } from "@/libs/prisma";
import { Category } from "@prisma/client";

export async function getCategorys() {
  return await prisma.category.findMany();
}

export async function getCategorybyId(id: string) {
  return await prisma.category.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
}

export async function createCategory(name: string) {
  return await prisma.category.create({
    data: {
      name,
    },
  });
}

export async function updateCategory(id: string, data: Category) {
  return await prisma.category.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}
