"use client";
import { Button } from "@client/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import {  useState } from "react";
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
