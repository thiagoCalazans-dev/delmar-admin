import { cn } from "@/utils/libs/twMerge";
import { forwardRef } from "react";

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-white shadow-sm px-4 py-2", className)}
    {...props}
  />
));
Card.displayName = "Card";
