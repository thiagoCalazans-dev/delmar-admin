import { Colors, columns } from "./columns";
import { DataTable } from "./data-table";
import { prisma } from "@/libs/prisma";

async function getColors(): Promise<Colors[]> {
  // Fetch data from your API here.
  const colors = await prisma.color.findMany();
  console.log(colors);
  return colors;
}

export default async function Colors() {
  const colors = await getColors();

  return (
    <div className="container mx-auto py-10 sm:max-w-2xl">
      <DataTable columns={columns} data={colors} />
    </div>
  );
}
