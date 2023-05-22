import { prisma } from "@/libs/prisma";
import { Brand } from "@prisma/client";

export async function getBrands() {
  return await prisma.brand.findMany();
}

export async function getBrandbyId(id: number) {
  return await prisma.brand.findUnique({
    where: {
      id,
    },
  });
}

export async function createBrand(name: string) {
  return await prisma.brand.create({
    data: {
      name,
    },
  });
}

export async function updateBrand(id: number, data: Brand) {
  return await prisma.brand.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteBrand(id: number) {
  return await prisma.brand.delete({
    where: {
      id,
    },
  });
}
