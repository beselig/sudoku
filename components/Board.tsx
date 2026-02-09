"use client";

import { sudokus } from "@/lib/schema";
import { activeCellAtom } from "@/shared/atoms";
import {
  BoardState,
  BoardValidityState as BoardValidityMap,
  Coordinates,
} from "@/shared/types";
import { cn } from "@/shared/utilts";
import { getBoardValidityState } from "@/shared/validate";
import { useAtom } from "jotai";
import { KeyboardEvent, useEffect, useState } from "react";
import { Cell } from "./Cell";

export function Board({
  sudoku,
  preview = false,
}: {
  sudoku: typeof sudokus.$inferSelect;
  preview?: boolean;
}) {
  const [gameState, setGameState] = useState<BoardState>(sudoku.puzzle);
  const [boardValidityState, setBoardValidityState] =
    useState<BoardValidityMap>(getBoardValidityState(gameState));
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);

  useEffect(() => {
    setBoardValidityState(getBoardValidityState(gameState));
  }, [gameState]);

  function onChangeValue([rowId, colId]: Coordinates, value: number | null) {
    setGameState(
      gameState.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          if (rowIndex === rowId && colIndex === colId) {
            return value;
          }
          return col;
        });
      }),
    );
  }

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
              solution={sudoku.solution[rowId][colId]}
              key={`${rowId}-${colId}`}
              value={col}
              coordinates={[rowId, colId]}
              valueChangeAction={onChangeValue}
              isStatic={!!sudoku.puzzle[rowId][colId]}
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
