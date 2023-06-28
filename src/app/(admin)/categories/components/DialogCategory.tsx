import { Button } from "@client/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import { ReactNode, useState } from "react";
import { FormCategory } from "./FormCategory";
import { Category } from "@/client/model/category";


interface CategoryDialogProps {
  children: ReactNode;
  data?: Category;
}

export function DialogCategory({ children, data }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastar Categoria</DialogTitle>
        </DialogHeader>
        <FormCategory data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
