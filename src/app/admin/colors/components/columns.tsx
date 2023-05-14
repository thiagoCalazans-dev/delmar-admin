"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Color = {
  id: number;
  name: string;
};

function handleDelete(data: Color) {
  api.delete("/color", data);
}

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
          Color
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
          <Button variant="primary" onClick={() => handleDelete(actions)}>
            <Pencil />
          </Button>
          <Button variant="destructive" onClick={() => console.log(actions)}>
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
