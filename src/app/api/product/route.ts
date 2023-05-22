import { createProduct, getProducts } from "@/repository/productRepository";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const products = await getProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const bodySchema = z.object({
    name: z.string(),
    code: z.string(),
    value: z.coerce.number(),
    description: z.string(),
    trending: z.coerce.boolean(),
    categoryId: z.coerce.number(),
    brandId: z.coerce.number(),
  });

  const body = await request.json();

  const data = bodySchema.parse(body);

  const product = await createProduct(data);

  return NextResponse.json(product, { status: 201 });
}
