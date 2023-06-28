import { Button } from "@client/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import { ReactNode, useState } from "react";

import { FormBrand } from "./FormBrand";
import { Brand } from "@/client/model/brand";

interface BrandDialogProps {
  children: ReactNode;
  data?: Brand;
}

export function DialogBrand({ children, data }: BrandDialogProps) {
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
          <DialogTitle>New Brand</DialogTitle>
        </DialogHeader>
        <FormBrand data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
