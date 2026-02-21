import { cn } from "@/shared/utilts";
import { PropsWithChildren, DOMAttributes } from "react";

export function SudokuContainer({
  children,
  className,
  ...props
}: PropsWithChildren<{ className?: string }> & DOMAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        className,
        "grid grid-cols-9 grid-rows-9 aspect-square w-full items gap-px p-px border border-white bg-gray-500 @container",
      )}
    >
      {children}
    </div>
  );
}
