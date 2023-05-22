import {
  deleteSize,
  getSizebyId,
  updateSize,
} from "@/repository/sizeRepository";
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

  const color = getSizebyId(id);
  return NextResponse.json(color);
}

export async function PUT(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const bodySchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
  });

  const body = await request.json();

  const { name, id } = bodySchema.parse(body);

  const data = {
    id,
    name,
  };

  const updatedSize = updateSize(id, data);
  return NextResponse.json(updateSize);
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

  const deletedSize = await deleteSize(id);
  return NextResponse.json(deletedSize);
}
