import { Color, columns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function getColors(): Promise<Color[]> {
  const response = await fetch("http://localhost:3000/api/color", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed fetch");
  }
  return response.json();
}

export default async function Colors() {
  const colors = await getColors();

  return (
    <div className="container mx-auto py-10 sm:max-w-2xl">
      <DataTable columns={columns} data={colors} />
    </div>
  );
}
