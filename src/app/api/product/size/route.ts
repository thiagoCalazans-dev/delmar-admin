import { createSize, getSizes } from "@/repository/sizeRepository";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const colors = await getSizes();
  return NextResponse.json(colors, { status: 200 });
}

export async function POST(request: Request) {
  const bodySchema = z.object({
    name: z.string(),
  });

  const body = await request.json();

  const { name } = bodySchema.parse(body);

  const size = await createSize(name);

  return NextResponse.json(size, { status: 201 });
}
