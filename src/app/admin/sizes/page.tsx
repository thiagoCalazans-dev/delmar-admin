import { Size, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { prisma } from "@/libs/prisma";

async function getSizes(): Promise<Size[]> {
  // Fetch data from your API here.
  return await prisma.size.findMany();
}

export default async function Sizes() {
  const sizes = await getSizes();

  return (
    <div className="container mx-auto py-10 sm:max-w-2xl">
      <DataTable columns={columns} data={sizes} />
    </div>
  );
}
