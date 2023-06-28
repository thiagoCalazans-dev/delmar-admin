"use client";

import { Button } from "@client/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { DialogSize } from "./DialogSize";
import { AlertDeleteDialog } from "@client/components/common/AlertDeleteDialog";
import { Size } from "@/client/model/size";


export const columns: ColumnDef<Size>[] = [
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
          Tamanho
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
          <DialogSize data={actions}>
            <Pencil />
          </DialogSize>
          <AlertDeleteDialog apiDeleteURL={`/product/category/${actions.id}`} />
        </div>
      );
    },
  },
];
