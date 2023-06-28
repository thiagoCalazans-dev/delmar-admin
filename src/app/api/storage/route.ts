import { createStorage, getStorages } from "@/server/repository/storageRepository";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const data = await getStorages();

  const storages = data.map((storage) => {
    const descontPercentage = storage.descont + "%";

    return {
      id: storage.id,
      product: storage.product.name,
      price: storage.price,
      amount: storage.amount,
      descont: descontPercentage,
      size: storage.size.name,
      color: storage.color.name,
    };
  });
  return NextResponse.json(storages, { status: 200 });
}

export async function POST(request: Request) {
  // const session = await getServerSession();
  // if (!session) {
  //   return new NextResponse(null, { status: 401 });
  // }

  const bodySchema = z.object({
    productId: z.coerce.number(),
    sizeId: z.coerce.number(),
    colorId: z.coerce.number(),
    price: z.coerce.number(),
    descont: z.coerce.number(),
    amount: z.coerce.number(),
  });

  const body = await request.json();

  const data = bodySchema.parse(body);

  const product = await createStorage(data);
  return NextResponse.json(product, { status: 201 });
}
