import { prisma } from "@/libs/prisma";
import { Brand } from "@prisma/client";

export async function getBrands() {
  return await prisma.brand.findMany();
}

export async function getBrandbyId(id: string) {
  return await prisma.brand.findUnique({
    where: {
      id: parseInt(id, 10),
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

export async function updateBrand(id: string, data: Brand) {
  return await prisma.brand.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
}

export async function deleteBrand(id: string) {
  return await prisma.brand.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
}
