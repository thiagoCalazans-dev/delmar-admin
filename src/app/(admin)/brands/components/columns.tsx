"use client";

import { Button } from "@/client/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { DialogBrand } from "./DialogBrand";
import { AlertDeleteDialog } from "@/client/components/common/AlertDeleteDialog";
import { Color } from "@/client/model/color";


export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marca
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const actions = row.original;

      return (
        <div className="flex gap-2 justify-end ">
          <DialogBrand data={actions}>
            <Pencil />
          </DialogBrand>
          <AlertDeleteDialog apiDeleteURL={`/product/brand/${actions.id}`} />
        </div>
      );
    },
  },
];
