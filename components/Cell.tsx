"use client";

import { activeCellAtom, currentActiveValueAtom } from "@/shared/atoms";
import { Coordinates } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { useAtom } from "jotai";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";

export type CellProps = {
  value: number | null;
  coordinates: Coordinates;
  valueChangeAction?: (location: Coordinates, value: number | null) => void;
  isStatic?: boolean;
  preview?: boolean;
  isValid?: boolean;
  isActive?: boolean;
};

export function Cell({
  value,
  valueChangeAction,
  coordinates,
  isStatic = false,
  preview = false,
  isValid = true,
  isActive = false,
}: CellProps) {
  const [candidates] = useState([]);
  const [clues] = useState([]);
  const [rowId, colId] = coordinates;
  const [currentActiveValue, setCurrentActiveValue] = useAtom(
    currentActiveValueAtom,
  );
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      el.current?.focus();
    }
  }, [isActive, el]);

  function onFocus() {
    setCurrentActiveValue(value);
    setActiveCell(coordinates);
  }
  function onBlur() {
    setCurrentActiveValue(null);
  }

  useEffect(() => {
    if (activeCell?.toString() === coordinates.toString()) {
      el.current?.focus();
    }
  }, [activeCell]);

  const handleChange: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isStatic || !valueChangeAction) return;

    switch (e.key) {
      case "Backspace":
        valueChangeAction(coordinates, null);

      default:
        const num = parseInt(e.key);

        if (Number.isNaN(num)) {
          break;
        }

        // implicitly excludes NaN, because NaN fails all comparisons
        if (num >= 1 && num <= 9) {
          valueChangeAction(coordinates, num);
        }
    }
  };

  return (
    <div
      className={cn(
        "size-full text-white relative grid content-stretch bg-black border border-white/30",
        !value || isValid || "bg-red-500",
        isStatic && "border-white/10",
        currentActiveValue && currentActiveValue === value && "bg-emerald-900",
        (rowId === 2 || rowId === 5) && "border-b-white",
        (colId === 2 || colId === 5) && "border-r-white",
      )}
    >
      <div
        ref={el}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleChange}
        tabIndex={1}
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
