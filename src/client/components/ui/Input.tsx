import * as React from "react";

import { cn } from "@/utils/libs/twMerge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-900 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
