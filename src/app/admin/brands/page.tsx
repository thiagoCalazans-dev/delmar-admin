import { Brand, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { prisma } from "@/libs/prisma";

async function getBrands(): Promise<Brand[]> {
  return await prisma.brand.findMany();
}

export default async function Brand() {
  const brand = await getBrands();

  return (
    <div className="container mx-auto py-10 sm:max-w-2xl">
      <DataTable columns={columns} data={brand} />
    </div>
  );
}
