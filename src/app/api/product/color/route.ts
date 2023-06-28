import { colorController } from "@/server/controller/colorServerController";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return await colorController.get(request);
}

export async function POST(request: Request) {  

   return await colorController.create(request);
}
