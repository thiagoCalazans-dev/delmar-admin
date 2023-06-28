import { Product } from "@client/model/product";
import { Category } from "@/client/model/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { api } from "@/utils/libs/axios";
import { useQuery } from "react-query";
import { Spinner } from "@client/components/ui/Spinner";

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
