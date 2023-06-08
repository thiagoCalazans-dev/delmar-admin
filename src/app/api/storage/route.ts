import { createStorage, getStorages } from "@/repository/storageRepository";

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

// export async function POST(request: Request) {
//   const session = await getServerSession();
//   if (!session) {
//     return new NextResponse(null, { status: 401 });
//   }

//   const bodySchema = z.object({
//     name: z.string(),
//     code: z.string(),
//     value: z.coerce.number(),
//     description: z.string(),
//     trending: z.boolean(),
//     categoryId: z.coerce.number(),
//     brandId: z.coerce.number(),
//   });

//   const body = await request.json();

//   const data = bodySchema.parse(body);

//   const product = await createProduct(data);
//   return NextResponse.json(product, { status: 201 });
// }
