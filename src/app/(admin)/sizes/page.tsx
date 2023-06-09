import { Suspense } from "react";
import { columns } from "./components/columns";
import { LoadingLogo } from "@client/components/ui/LoadingLogo";
import { Size } from "@/client/model/size";

import { DataTable } from "./components/DataTable";

async function getSizes(): Promise<Size[]> {
  const response = await fetch("http://localhost:3000/api/product/category", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed fetch");
  }
  return response.json();
}

export default async function Size() {
  const colors = await getSizes();

  return (
    <div className="container mx-auto sm:max-w-2xl">
      <Suspense fallback={<LoadingLogo />}>
        <div className="w-full flex items-center justify-center"></div>
        <DataTable columns={columns} data={colors} />
      </Suspense>
    </div>
  );
}
