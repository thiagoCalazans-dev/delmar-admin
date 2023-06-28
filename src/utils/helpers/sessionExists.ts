import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function sessionExists() {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse(null, { status: 401 });
  }
  return session;
}
