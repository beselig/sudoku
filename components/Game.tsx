"use client";

import { useEffect, useState } from "react";
import { Cell } from "./SodokuField";
import { CellCoordinates, GameState } from "@/shared/types";
import { fetchSudoku } from "@/server/fetchSudokus";
import { db } from "@/lib/db";
import { sudokus } from "@/lib/schema";
import PageLoader from "next/dist/client/page-loader";

const demoState = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export function Game({ id }: { id: string }) {
  const [sudoku, setSudoku] = useState<typeof sudokus.$inferSelect>();
  const [gameState, setGameState] = useState<GameState>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchSudoku(id)
      .then((value) => {
        if (!value) setError("Not found");
        setSudoku(value);
        setGameState(value!.statics);
      })
      .catch((err) => setError(String(err)));
  }, []);

  function onChangeValue([rowId, colId]: CellCoordinates, value: number) {
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
                isStatic={!!sudoku.statics[rowId][colId]}
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

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];
