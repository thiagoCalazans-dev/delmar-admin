import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/Dialog";
import { FormColor } from "./FormColor";
import { ReactNode } from "react";
import { Color } from "./columns";

interface ColorDialogProps {
  children: ReactNode;
  data?: Color;
}

export function ColorDialog({ children, data }: ColorDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Color</DialogTitle>
        </DialogHeader>
        <FormColor data={data} />
      </DialogContent>
    </Dialog>
  );
}
