import { createColor, getColors } from "@/server/repository/colorRepository";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const colors = await getColors();
  return NextResponse.json(colors, { status: 200 });
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

  const color = await createColor(name);

  return NextResponse.json(color, { status: 201 });
}
