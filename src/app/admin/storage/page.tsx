import { Product } from "@/@types/types";
import { LoadingLogo } from "@/components/ui/LoadingLogo";
import { Suspense } from "react";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/storage", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed fetch");
  }
  return response.json();
}

export default async function Products() {
  const storage = await fetchProducts();

  return (
    <div className="container mx-auto xl:px-8">
      <Suspense fallback={<LoadingLogo />}>
        <DataTable columns={columns} data={storage} />
      </Suspense>
    </div>
  );
}
