import { Category, Product } from "@/@types/types";
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

interface SelectCategoryProps {
  field: any;
  data?: Product;
}
async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("/product/category");
  return data;
}

export function SelectCategories({ field, data }: SelectCategoryProps) {
  const { data: category, isLoading } = useQuery("categories", getCategories);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={data && String(data.categoryId)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Escolha uma categoria.." />
      </SelectTrigger>
      <SelectContent>
        {category?.map((category) => {
          return (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
