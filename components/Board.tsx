"use client";

import { sudokus } from "@/lib/schema";
import { activeCellAtom } from "@/shared/atoms";
import { GameState, Coordinates, BoardValidityState } from "@/shared/types";
import { cn } from "@/shared/utilts";
import { useAtom } from "jotai";
import { KeyboardEvent } from "react";
import { Cell } from "./Cell";

export function Board({
  puzzle,
  gameState,
  boardValidityState,
  preview = false,
  cellUpdateAction,
}: {
  puzzle: typeof sudokus.$inferSelect.puzzle;
  boardValidityState: BoardValidityState;
  gameState: GameState;
  preview?: boolean;
  cellUpdateAction: (location: Coordinates, value: number | null) => void;
}) {
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!e.key.includes("Arrow") || !activeCell) return;

    e.preventDefault();

    switch (e.key) {
      case "ArrowUp":
        if (activeCell[0] === 0) {
          break;
        }
        setActiveCell([activeCell[0] - 1, activeCell[1]]);
        break;
      case "ArrowDown":
        if (activeCell[0] === 8) {
          break;
        }
        setActiveCell([activeCell[0] + 1, activeCell[1]]);
        break;
      case "ArrowLeft":
        if (activeCell[1] === 0) {
          break;
        }
        setActiveCell([activeCell[0], activeCell[1] - 1]);
        break;
      case "ArrowRight":
        if (activeCell[1] === 8) {
          break;
        }
        setActiveCell([activeCell[0], activeCell[1] + 1]);
        break;
    }
  }

  return (
    <section className="w-full @container max-w-4xl">
      <div
        onKeyDown={handleKeyDown}
        className={cn(
          preview || "min-w-sm",
          "grid grid-cols-9 grid-rows-9 aspect-square w-full items gap-px p-px border border-white bg-gray-500",
        )}
      >
        {gameState.map((row, rowId) =>
          row.map((col, colId) => (
            <Cell
              key={`${rowId}-${colId}`}
              value={col}
              coordinates={[rowId, colId]}
              valueChangeAction={cellUpdateAction}
              isStatic={!!puzzle[rowId][colId]}
              preview={preview}
              isValid={boardValidityState[rowId][colId]}
              isActive={activeCell?.[0] === rowId && activeCell?.[1] === colId}
            />
          )),
        )}
      </div>
    </section>
  );
}
