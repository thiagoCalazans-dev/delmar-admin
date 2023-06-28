import { Button } from "@client/components/ui/Button";
import { Storage } from "@/client/model/storage";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@client/components/ui/Dialog";
import { ReactNode, useState } from "react";

import { FormStorage } from "./FormStorage";

interface StorageDialogProps {
  children: ReactNode;
  data?: Storage;
}

export function DialogStorage({ children, data }: StorageDialogProps) {
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
        <FormStorage data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
