"use client";

import { Button } from "@client/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { AlertDeleteDialog } from "@client/components/common/AlertDeleteDialog";
import { DialogProduct } from "./DialogProduct";
import { Product } from "@/client/model/product";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className=""
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
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
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
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Custo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <>{formatted}</>;
    },
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const actions = row.original;

      return (
        <div className="flex gap-2 justify-end ">
          <DialogProduct data={actions}>
            <Pencil />
          </DialogProduct>
          <AlertDeleteDialog apiDeleteURL={`/product/${actions.id}`} />
        </div>
      );
    },
  },
];
