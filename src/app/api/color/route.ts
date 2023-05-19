import { createColor, getColors } from "@/repository/colorRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const colors = await getColors();
  return NextResponse.json(colors, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const color = await createColor(name);

  return NextResponse.json(color, { status: 201 });
}
