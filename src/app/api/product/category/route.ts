import { createCategory, getCategorys } from "@/repository/categoryRepository";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const categories = await getCategorys();
  return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const bodySchema = z.object({
    name: z.string(),
  });

  const body = await request.json();

  const { name } = bodySchema.parse(body);

  const category = await createCategory(name);

  return NextResponse.json(category, { status: 201 });
}
