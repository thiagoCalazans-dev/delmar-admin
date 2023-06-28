import { Button } from "@client/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import { ReactNode, useState } from "react";

import { FormProduct } from "./FormProduct";
import { Product } from "@/client/model/product";

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
