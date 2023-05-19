import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/Dialog";
import { FormColor } from "./FormColor";
import { ReactNode, useState } from "react";
import { Color } from "@/@types/types";

interface ColorDialogProps {
  children: ReactNode;
  data?: Color;
}

export function ColorDialog({ children, data }: ColorDialogProps) {
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
          <DialogTitle>New Color</DialogTitle>
        </DialogHeader>
        <FormColor data={data} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
