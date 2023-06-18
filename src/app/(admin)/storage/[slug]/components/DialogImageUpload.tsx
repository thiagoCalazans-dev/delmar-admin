"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/Dialog";
import { ReactNode, useState } from "react";
import { Product } from "@/@types/types";
import { FormImageUpload } from "./FormImageUpload";

export function DialogImageUpload() {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova Imagem</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastar Imagem</DialogTitle>
        </DialogHeader>
        <FormImageUpload closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
