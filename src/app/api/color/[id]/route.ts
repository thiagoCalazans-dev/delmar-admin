import {
  deleteColor,
  getColorbyId,
  updateColor,
} from "@/repository/colorRepository";
import { NextResponse } from "next/server";

interface params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: params) {
  const id = params.id;
  const color = getColorbyId(id);
  return NextResponse.json(color);
}

export async function PUT(request: Request, { params }: params) {
  const id = params.id;
  const data = await request.json();
  const updatedColor = updateColor(id, data);
  return NextResponse.json(updatedColor);
}

export async function DELETE(request: Request, { params }: params) {
  const id = params.id;
  const deletedColor = await deleteColor(id);

  return NextResponse.json(deletedColor);
}
