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

export function ColorDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Color</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Color</DialogTitle>
        </DialogHeader>
        <FormColor />
      </DialogContent>
    </Dialog>
  );
}
