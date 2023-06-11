import { Storage } from "@/@types/types";
import { Card } from "@/components/ui/Card";
import { Container } from "postcss";

async function getStorageItem(id: string): Promise<Storage> {
  const response = await fetch(`http://localhost:3000/api/storage/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed fetch");
  }
  return response.json();
}

export default async function StorageItem({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;
  const storageItem: Storage = await getStorageItem(id);

  return (
    <div className="flex flex-col items-center  w-full p-2">
      <Card className="md:max-w-[56rem] w-full">
        <div className="flex gap-2">
          <strong>id:</strong>
          <span>{storageItem.id}</span>
        </div>
        <div className="flex gap-2">
          <strong>Produto:</strong>
          <span>{storageItem.product.name}</span>
        </div>
        <div className="flex gap-2">
          <strong>Quantidade:</strong>
          <span>{storageItem.amount}</span>
        </div>

        <div className="flex gap-2">
          <strong>Preço:</strong>
          <span>{storageItem.price}</span>
        </div>
        <div className="flex gap-2">
          <strong>Desconto:</strong>
          <span>{storageItem.descont}</span>
        </div>
      </Card>
    </div>
  );
}
