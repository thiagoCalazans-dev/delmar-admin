import { colorController } from "@/server/controller/colorServerController";
import { colorParams } from "@/server/schema/colorSchema";

export async function GET(
  request: Request,
  { params }: { params: colorParams }
) {
  return await colorController.getById(params);
}

export async function PUT(request: Request) {
  return await colorController.updateColorById(request);
}

export async function DELETE(
  request: Request,
  { params }: { params: colorParams }
) {
  return await colorController.deleteColorById(request, params);
}
