"use client";

import { activeCellAtom, currentActiveValueAtom } from "@/shared/atoms";
import { Coordinates } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { cva } from "class-variance-authority";
import { useSetAtom } from "jotai";
import { useAtom } from "jotai";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";

export type SudokuCellProps = {
  value: number | null;
  coordinates: Coordinates;
  valueChangeAction?: (location: Coordinates, value: number | null) => void;
  isStatic?: boolean;
  preview?: boolean;
  isValid?: boolean;
  isActive?: boolean;
};

export function SudokuCell({
  value,
  valueChangeAction,
  coordinates,
  isStatic = false,
  preview = false,
  isValid = true,
  isActive = false,
}: SudokuCellProps) {
  const [candidates] = useState([]);
  const [clues] = useState([]);
  const [rowId, colId] = coordinates;
  const [currentActiveValue, setCurrentActiveValue] = useAtom(
    currentActiveValueAtom,
  );
  const setActiveCell = useSetAtom(activeCellAtom);
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
      className={variants({
        boxEdgeBottom: !!(rowId === 2 || rowId === 5),
        boxEdgeRight: !!(colId === 2 || colId === 5),
        preview,
        valid: !value || isValid,
        highlighted: !!(currentActiveValue && currentActiveValue === value),
        intent: isStatic ? "static" : "editable",
      })}
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

const variants = cva(
  ["size-full text-white relative grid content-stretch border bg-black"],
  {
    variants: {
      intent: {
        editable: "border-white/30",
        static: "border-white/10",
      },
      preview: { true: "pointer-events-none" },
      highlighted: {
        true: "bg-emerald-900",
      },
      valid: { false: "bg-red-500" },
      boxEdgeRight: { true: "border-r-white" },
      boxEdgeBottom: { true: "border-b-white" },
    },
    compoundVariants: [
      { highlighted: true, valid: false, class: "bg-emerald-900" },
    ],
    defaultVariants: {
      intent: "editable",
      preview: false,
      valid: true,
    },
  },
);
