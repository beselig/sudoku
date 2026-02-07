"use client";

import { CellCoordinates } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { useState, ChangeEvent, KeyboardEventHandler } from "react";

export type CellProps = {
  value: number | null;
  solution: number;
  location: CellCoordinates;
  onChangeValue: (location: CellCoordinates, value: number | null) => void;
  isStatic?: boolean;
};

export function Cell({
  value,
  onChangeValue,
  location,
  isStatic = false,
}: CellProps) {
  const [candidates] = useState([]);
  const [clues] = useState([]);
  const [rowId, colId] = location;

  const handleChange: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isStatic) return;

    switch (e.key) {
      case "Backspace":
        onChangeValue(location, null);
      default:
        const num = parseInt(e.key);

        // implicitly excludes NaN, because NaN fails all comparisons
        if (num >= 1 && num <= 9) {
          return onChangeValue(location, num);
        }
    }
  };

  return (
    <div
      className={cn(
        "size-full text-white relative grid content-stretch bg-black border-3 border-white/30",
        isStatic && "border-white/10",
        (rowId === 2 || rowId === 5) && "border-b-white",
        (colId === 2 || colId === 5) && "border-r-white",
      )}
    >
      <div
        onKeyDown={handleChange}
        tabIndex={isStatic ? -1 : 1}
        className={cn(
          "outline-none select-none focus:bg-emerald-800 self-center text-center text-3xl justify-center aspect-square size-full items-center flex bg-white/30",
          isStatic && "pointer-events-none bg-white/10",
        )}
      >
        {value || ""}
      </div>
      {value ? null : (
        <>
          <div className="self-center text-center">{candidates}</div>
          <div className="absolute">{clues}</div>
        </>
      )}
    </div>
  );
}
