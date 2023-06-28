import { NextResponse } from "next/server";
import {
  createColor,
  deleteColor,
  getColorbyId,
  getColors,
  updateColor,
} from "../repository/colorRepository";

import {
  colorParamsSchema,
  colorParams,
  colorBodySchema,
  colorCreateBodySchema,
} from "../schema/colorSchema";
import { getServerSession } from "next-auth";

async function get(request: Request) {
  const colors = await getColors();
  return NextResponse.json(colors, { status: 200 });
}

export async function getById(params: colorParams) {
  const parsedParams = colorParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "You must be provide a valid id",
    });
  }

  const { id } = parsedParams.data;
  const color = await getColorbyId(id);
  return NextResponse.json(color);
}

async function create(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await request.json();

  const parsedBody = colorCreateBodySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "You need to provide a content to create a Color",
    });
  }

  const { name } = parsedBody.data;

  const color = await createColor(name);

  return NextResponse.json(color, { status: 201 });
}

async function updateColorById(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await request.json();

  const parsedBody = colorBodySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "You need to provide a content to create a Color",
    });
  }

  const { name, id } = parsedBody.data;

  const data = {
    id,
    name,
  };

  const updatedColor = updateColor(id, data);
  return NextResponse.json(updatedColor);
}

async function deleteColorById(request: Request, params: colorParams) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const parsedParams = colorParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "You must be provide a valid id",
    });
  }

  const { id } = parsedParams.data;

  const deletedColor = await deleteColor(id);
  return NextResponse.json(deletedColor);
}

export const colorController = {
  get,
  getById,
  create,
  updateColorById,
  deleteColorById,
};
