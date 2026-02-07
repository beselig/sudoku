"use client";

import { sudokus } from "@/lib/schema";
import { CellCoordinates, GameState } from "@/shared/types";
import { useState } from "react";
import { Cell } from "./Cell";

export function Game({ sudoku }: { sudoku: typeof sudokus.$inferSelect }) {
  const [gameState, setGameState] = useState<GameState>(sudoku.puzzle);
  const [error, setError] = useState<string | undefined>();

  function onChangeValue(
    [rowId, colId]: CellCoordinates,
    value: number | null,
  ) {
    if (!gameState) {
      setError("Unexpected change event before gameState was initialized");
      return;
    }

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

  if (error) {
    return <>{error}</>;
  }

  if (!sudoku || !gameState) {
    return <>Loading ... </>;
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-9 grid-rows-9 aspect-square w-full items gap-px p-px bg-white min-w-sm">
        {gameState.map((row, rowId) => {
          return row.map((col, colId) => {
            return (
              <Cell
                solution={sudoku.solution[rowId][colId]}
                key={`${rowId}-${colId}`}
                value={col}
                location={[rowId, colId]}
                onChangeValue={onChangeValue}
                isStatic={!!sudoku.puzzle[rowId][colId]}
              />
            );
          });
        })}
      </div>
    </section>
  );
}

function validateGameState(attempt: GameState, solution: GameState) {
  const invalidFields: CellCoordinates[] = [];
  for (let rowId = 0; rowId <= 9; rowId++) {
    for (let colId = 0; colId <= 9; colId++) {
      if (validateField(attempt, solution, [rowId, colId])) {
        invalidFields.push([rowId, colId]);
      }
    }
  }
}

function validateField(
  attempt: GameState,
  solution: GameState,
  [rowId, colId]: CellCoordinates,
) {
  if (attempt[rowId][colId] === solution[rowId][colId]) {
    return true;
  }
  return false;
}
