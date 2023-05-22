import { prisma } from "@/libs/prisma";
import { Product } from "@prisma/client";

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function getProductbyId(id: number) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

type CreateProduct = Omit<Product, "id">;

export async function createProduct(product: CreateProduct) {
  const { name, brandId, categoryId, code, description, trending, value } =
    product;
  return await prisma.product.create({
    data: {
      name,
      code,
      brandId,
      categoryId,
      description,
      trending,
      value,
    },
  });
}

export async function updateProduct(id: number, data: Product) {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}
