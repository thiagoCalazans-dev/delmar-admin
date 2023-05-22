import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2  disabled:opacity-50  disabled:pointer-events-none  data-[state=open]:bg-zinc-100 ",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-900  text-zinc-100   hover:bg-zinc-700   focus:bg-zinc-700 ",
        table:
          "flex h-full cursor-pointer  select-none items-center text-sm font-medium text-zinc-100 outline-none  focus:bg-zinc-800 hover:bg-zinc-800",
        destructive:
          "bg-red-600 text-zinc-100 hover:bg-red-400 hover:text-zinc-900 focus:bg-red-400 focus:text-zinc-900",
        outline:
          "bg-transparent border border-zinc-900 hover:bg-zinc-900 text-zinc-900 hover:text-zinc-300",
        ghost:
          "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
