"use client";

import { highlightedValueAtom } from "@/shared/atoms";
import { Coordinates } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { KeyboardEventHandler, useEffect, useState } from "react";

export type CellProps = {
  value: number | null;
  solution: number;
  coordinates: Coordinates;
  changeValue: (location: Coordinates, value: number | null) => void;
  isStatic?: boolean;
  preview?: boolean;
  isValid?: boolean;
};

export function Cell({
  value,
  changeValue: onChangeValue,
  coordinates: location,
  isStatic = false,
  preview = false,
  isValid = true,
}: CellProps) {
  const [candidates] = useState([]);
  const [clues] = useState([]);
  const [rowId, colId] = location;
  const [highlightedValue, setHighlightedValue] = useAtom(highlightedValueAtom);

  function onFocus() {
    setHighlightedValue(value);
  }
  function onBlur() {
    setHighlightedValue(null);
  }

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
        "size-full text-white relative grid content-stretch bg-black border border-white/30",
        !value || isValid || "bg-red-500",
        highlightedValue && highlightedValue === value && "bg-emerald-300",
        isStatic && "border-white/10",
        (rowId === 2 || rowId === 5) && "border-b-white",
        (colId === 2 || colId === 5) && "border-r-white",
      )}
    >
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleChange}
        tabIndex={isStatic ? -1 : 1}
        className={cn(
          "outline-none select-none focus:bg-emerald-800 self-center text-center @xs:text-base @sm:text-xl @md:text-2xl @lg:text-3xl @xl:text-4xl @2xl:text-5xl @4xl:text-6xl justify-center aspect-square size-full items-center flex bg-white/30",
          isStatic || (preview && "pointer-events-none "),
          isStatic && "bg-white/10",
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
