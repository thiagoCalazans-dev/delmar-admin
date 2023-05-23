"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/libs/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/Popover";
import { Button } from "../../../../components/ui/Button";

const brands = [
  {
    value: "1",
    label: "Pé na areia",
  },
  {
    value: "2",
    label: "Caipirinha",
  },
  {
    value: "3",
    label: "Agua de coco",
  },
  {
    value: "4",
    label: "Cervejinha",
  },
] as const;

export function ComboboxBrands({ field, setValue }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          {field.value
            ? brands.find((brand) => brand.value === field.value)?.label
            : "Escolha uma marca..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Procure..." />
          <CommandEmpty>Não encontrada.</CommandEmpty>
          <CommandGroup>
            {brands.map((brand) => (
              <CommandItem
                className="cursor-pointer hover:bg-zinc-700 hover:text-zinc-100"
                key={brand.value}
                onSelect={(value) => {
                  setValue("brandId", value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === brand.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {brand.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
