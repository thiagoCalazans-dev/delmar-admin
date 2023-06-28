import {
  deleteProduct,
  getProductbyId,
  updateProduct,
} from "@/server/repository/productRepository";
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

  const product = getProductbyId(id);
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const bodySchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    value: z.coerce.number(),
    description: z.string(),
    trending: z.coerce.boolean(),
    categoryId: z.coerce.number(),
    brandId: z.coerce.number(),
  });

  const body = await request.json();

  const { name, id, brandId, categoryId, code, description, trending, value } =
    bodySchema.parse(body);

  const data = {
    id,
    name,
    brandId,
    categoryId,
    code,
    description,
    trending,
    value,
  };

  const updatedProduct = updateProduct(id, data);
  return NextResponse.json(updatedProduct);
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

  const deletedProduct = await deleteProduct(id);
  return NextResponse.json(deletedProduct);
}
