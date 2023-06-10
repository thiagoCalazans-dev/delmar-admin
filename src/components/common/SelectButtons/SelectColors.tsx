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
async function getColors(): Promise<Size[]> {
  const { data } = await api.get("/product/color");
  return data;
}

export function SelectColors({ field, data }: SelectSizeProps) {
  const { data: colors, isLoading } = useQuery("colors", getColors);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={data && String(data.color.id)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Escolha uma cor.." />
      </SelectTrigger>
      <SelectContent>
        {colors?.map((color) => {
          return (
            <SelectItem key={color.id} value={String(color.id)}>
              {color.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
