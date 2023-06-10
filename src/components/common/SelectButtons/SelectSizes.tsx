import { Size, Storage } from "@/@types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { api } from "@/libs/axios";
import { useQuery } from "react-query";
import { Spinner } from "@/components/ui/Spinner";

interface SelectSizeProps {
  field: any;
  data?: Storage;
}
async function getSizes(): Promise<Size[]> {
  const { data } = await api.get("/product/size");
  return data;
}

export function SelectSizes({ field, data }: SelectSizeProps) {
  const { data: sizes, isLoading } = useQuery("sizes", getSizes);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={data && String(data.size.id)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Escolha um tamanho.." />
      </SelectTrigger>
      <SelectContent>
        {sizes?.map((size) => {
          return (
            <SelectItem key={size.id} value={String(size.id)}>
              {size.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
