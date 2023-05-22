import { createBrand, getBrands } from "@/repository/brandRepository";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const colors = await getBrands();
  return NextResponse.json(colors, { status: 200 });
}

export async function POST(request: Request) {
  const bodySchema = z.object({
    name: z.string(),
  });

  const body = await request.json();

  const { name } = bodySchema.parse(body);

  const color = await createBrand(name);

  return NextResponse.json(color, { status: 201 });
}