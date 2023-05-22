import { Suspense } from "react";
import { columns } from "./components/columns";

import { LoadingLogo } from "@/components/ui/LoadingLogo";
import { Color } from "@/@types/types";
import { DataTable } from "./components/DataTable";

async function getColors(): Promise<Color[]> {
  const response = await fetch("http://localhost:3000/api/product/color", {
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
    <div className="container mx-auto sm:max-w-2xl">
      <Suspense fallback={<LoadingLogo />}>
        <div className="w-full flex items-center justify-center"></div>
        <DataTable columns={columns} data={colors} />
      </Suspense>
    </div>
  );
}
