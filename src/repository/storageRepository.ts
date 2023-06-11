import { prisma } from "@/libs/prisma";
import { Storage } from "@prisma/client";

export async function getStorages() {
  return await prisma.storage.findMany({
    include: {
      product: true,
      color: true,
      size: true,
      Photos: true,
    },
  });
}

export async function getStoragebyId(id: number) {
  return await prisma.storage.findUnique({
    where: {
      id,
    },
    include: {
      color: true,
      product: true,
      size: true,
      Photos: true,
    },
  });
}

type CreateStorage = Omit<Storage, "id">;

export async function createStorage(storage: CreateStorage) {
  const { productId, amount, colorId, descont, price, sizeId } = storage;
  return await prisma.storage.create({
    data: {
      productId,
      amount,
      colorId,
      descont,
      price,
      sizeId,
    },
  });
}

export async function updateStorage(id: number, data: Storage) {
  return await prisma.storage.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteStorage(id: number) {
  return await prisma.storage.delete({
    where: {
      id,
    },
  });
}
