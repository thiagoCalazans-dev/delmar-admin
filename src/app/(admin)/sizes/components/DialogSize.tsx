import { Button } from "@client/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import { ReactNode, useState } from "react";

import { FormSize } from "./FormSize";
import { Size } from "@/client/model/size";


interface SizeDialogProps {
  children: ReactNode;
  data?: Size;
}

export function DialogSize({ children, data }: SizeDialogProps) {
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
        <FormSize data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
