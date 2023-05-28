import { Brand, Product } from "@/@types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { api } from "@/libs/axios";
import { Button } from "@/components/ui/Button";
import { useQuery } from "react-query";
import { Spinner } from "@/components/ui/Spinner";

interface SelectBrandProps {
  field: any;
  data?: Product;
}
async function getBrands(): Promise<Brand[]> {
  const { data } = await api.get("/product/brand");
  return data;
}

export function SelectBrands({ field, data }: SelectBrandProps) {
  const { data: brands, isLoading } = useQuery("brands", getBrands);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={data && String(data.brandId)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Escolha uma marca.." />
      </SelectTrigger>
      <SelectContent>
        {brands?.map((brand) => {
          return (
            <SelectItem key={brand.id} value={String(brand.id)}>
              {brand.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
