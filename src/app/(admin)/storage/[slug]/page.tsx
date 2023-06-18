import { Storage } from "@/@types/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { DialogImageUpload } from "./components/DialogImageUpload";

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
  console.log(storageItem);

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
          <strong>Valor de compra:</strong>
          <span>{storageItem.product.value}</span>
        </div>

        <div className="flex gap-2">
          <strong>Preço:</strong>
          <span>{storageItem.price}</span>
        </div>
        <div className="flex gap-2">
          <strong>Desconto:</strong>
          <span>{storageItem.descont}%</span>
        </div>
        <div className="flex gap-2">
          <strong>Cor:</strong>
          <span>{storageItem.color.name}</span>
        </div>
        <div className="flex gap-2">
          <strong>Tamanho:</strong>
          <span>{storageItem.size.name}</span>
        </div>
        <div className="flex flex-col">
          <strong>Imagens:</strong>
          <DialogImageUpload />
          <div className="flex mt-2 gap-2 items-center justify-start bg-red-300">
            {storageItem.Photos.map((img) => {
              return (
                <div key={img.id} className="relative h-28 w-28">
                  <Image
                    className=""
                    fill
                    alt={img.description}
                    src={img.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
