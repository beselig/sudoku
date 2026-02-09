"use client";

import { activeCellAtom, highlightedValueAtom } from "@/shared/atoms";
import { Coordinates } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";

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
  changeValue,
  coordinates,
  isStatic = false,
  preview = false,
  isValid = true,
}: CellProps) {
  const [candidates] = useState([]);
  const [clues] = useState([]);
  const [rowId, colId] = coordinates;
  const [highlightedValue, setHighlightedValue] = useAtom(highlightedValueAtom);
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);
  const el = useRef<HTMLDivElement>(null);

  function onFocus() {
    setHighlightedValue(value);
    setActiveCell(coordinates);
  }
  function onBlur() {
    setHighlightedValue(null);
  }

  useEffect(() => {
    if (activeCell?.toString() === coordinates.toString()) {
      el.current?.focus();
    }
  }, [activeCell]);

  const handleChange: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (
      e.key.includes("Arrow") &&
      activeCell?.toString() === coordinates.toString()
    ) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          if (coordinates[0] === 0) {
            break;
          }
          setActiveCell([activeCell[0] - 1, activeCell[1]]);
          break;
        case "ArrowDown":
          if (coordinates[0] === 8) {
            break;
          }
          setActiveCell([activeCell[0] + 1, activeCell[1]]);
          break;
        case "ArrowLeft":
          if (coordinates[1] === 0) {
            break;
          }
          setActiveCell([activeCell[0], activeCell[1] - 1]);
          break;
        case "ArrowRight":
          if (coordinates[1] === 8) {
            break;
          }
          setActiveCell([activeCell[0], activeCell[1] + 1]);
          break;
      }
    }

    if (isStatic) return;

    switch (e.key) {
      case "Backspace":
        changeValue(coordinates, null);

      default:
        const num = parseInt(e.key);
        if (Number.isNaN(num)) {
          break;
        }

        // implicitly excludes NaN, because NaN fails all comparisons
        if (num >= 1 && num <= 9) {
          changeValue(coordinates, num);
        }
    }
  };

  return (
    <div
      className={cn(
        "size-full text-white relative grid content-stretch bg-black border border-white/30",
        !value || isValid || "bg-red-500",
        isStatic && "border-white/10",
        highlightedValue && highlightedValue === value && "bg-emerald-900",
        (rowId === 2 || rowId === 5) && "border-b-white",
        (colId === 2 || colId === 5) && "border-r-white",
      )}
    >
      <div
        ref={el}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleChange}
        tabIndex={isStatic ? -1 : 1}
        className={cn(
          "outline-none select-none focus:bg-cyan-600 self-center text-center @xs:text-base @sm:text-xl @md:text-2xl @lg:text-3xl @xl:text-4xl @2xl:text-5xl @4xl:text-6xl justify-center aspect-square size-full items-center flex bg-white/30",
          isStatic && "bg-white/10",
          preview && "pointer-events-none ",
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
