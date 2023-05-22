import {
  deleteColor,
  getColorbyId,
  updateColor,
} from "@/repository/colorRepository";
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

  const color = getColorbyId(id);
  return NextResponse.json(color);
}

export async function PUT(request: Request) {
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

  const updatedColor = updateColor(id, data);
  return NextResponse.json(updatedColor);
}

export async function DELETE(
  request: Request,
  { params }: { params: paramsType }
) {
  const { id } = paramsSchema.parse(params);

  const deletedColor = await deleteColor(id);
  return NextResponse.json(deletedColor);
}
