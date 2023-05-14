import { Colors, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { prisma } from "@/libs/prisma";

async function getColors(): Promise<Colors[]> {
  // Fetch data from your API here.
  return await prisma.color.findMany();
}

export default async function Colors() {
  const colors = await getColors();

  return (
    <div className="container mx-auto py-10 sm:max-w-2xl">
      <DataTable columns={columns} data={colors} />
    </div>
  );
}
