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
import { FormProduct } from "./FormProduct";

interface ProductDialogProps {
  children: ReactNode;
  data?: Product;
}

export function DialogProduct({ children, data }: ProductDialogProps) {
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
          <DialogTitle>Cadastar Produto</DialogTitle>
        </DialogHeader>
        <FormProduct data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
