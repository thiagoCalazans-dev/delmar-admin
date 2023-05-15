"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColorDialog } from "./DialogColor";
import { AlertDialogDeleteColor } from "./AlertDialogDeleteColor";

export type Color = {
  id: number;
  name: string;
};

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
          <ColorDialog data={actions}>
            <Pencil />
          </ColorDialog>
          <AlertDialogDeleteColor id={actions.id} />
        </div>
      );
    },
  },
];
