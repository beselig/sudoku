"use client";

import { sudokus } from "@/lib/schema";
import {
  Coordinates,
  BoardState,
  BoardValidityState as BoardValidityMap,
} from "@/shared/types";
import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { cn } from "@/shared/utilts";
import { getBoardValidityState } from "@/shared/validate";
import { useAtom, useSetAtom } from "jotai";
import { activeCellAtom } from "@/shared/atoms";

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

  return (
    <section className="w-full @container max-w-4xl">
      <div
        className={cn(
          preview || "min-w-sm",
          "grid grid-cols-9 grid-rows-9 aspect-square w-full items gap-px p-px border border-white bg-gray-500",
        )}
      >
        {gameState.map((row, rowId) => {
          return row.map((col, colId) => {
            const coordinates: Coordinates = [rowId, colId];
            return (
              <Cell
                solution={sudoku.solution[rowId][colId]}
                key={`${rowId}-${colId}`}
                value={col}
                coordinates={coordinates}
                changeValue={onChangeValue}
                isStatic={!!sudoku.puzzle[rowId][colId]}
                preview={preview}
                isValid={boardValidityState[rowId][colId]}
              />
            );
          });
        })}
      </div>
    </section>
  );
}
