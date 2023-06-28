"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@client/components/ui/AlertDialog";
import { Button } from "@client/components/ui/Button";
import { api } from "@/utils/libs/axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface AlertDeleteDialogProps {
  apiDeleteURL: string;
  title?: string;
  description?: string;
}

export function AlertDeleteDialog({
  apiDeleteURL,
  title = "Are you sure absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your data from our servers.",
}: AlertDeleteDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    const res = await api.delete(apiDeleteURL);
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
