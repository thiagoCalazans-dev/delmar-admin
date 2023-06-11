import {
  deleteStorage,
  getStoragebyId,
  updateStorage,
  getStorages,
} from "@/repository/storageRepository";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";

const paramsSchema = z.object({
  id: z.coerce.number(),
});

type paramsType = z.infer<typeof paramsSchema>;

export async function GET(
  request: Request,
  { params }: { params: paramsType }
) {
  const { id } = paramsSchema.parse(params);

  const storageItem = await getStoragebyId(id);

  return NextResponse.json(storageItem);
}

export async function PUT(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const bodySchema = z.object({
    id: z.coerce.number(),
    productId: z.coerce.number(),
    sizeId: z.coerce.number(),
    colorId: z.coerce.number(),
    price: z.coerce.number(),
    descont: z.coerce.number(),
    amount: z.coerce.number(),
  });

  const body = await request.json();

  const { id, productId, sizeId, colorId, price, descont, amount } =
    bodySchema.parse(body);

  const data = {
    id,
    productId,
    sizeId,
    colorId,
    price,
    descont,
    amount,
  };

  const updatedStorage = updateStorage(id, data);
  return NextResponse.json(updatedStorage);
}

export async function DELETE(
  request: Request,
  { params }: { params: paramsType }
) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const { id } = paramsSchema.parse(params);

  const deletedStorage = await deleteStorage(id);
  return NextResponse.json(deletedStorage);
}
