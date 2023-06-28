import { prisma } from "@/utils/libs/prisma";
import { Category } from "@prisma/client";

export async function getCategorys() {
  return await prisma.category.findMany();
}

export async function getCategorybyId(id: number) {
  return await prisma.category.findUnique({
    where: {
      id,
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

export async function updateCategory(id: number, data: Category) {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCategory(id: number) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}
