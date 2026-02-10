import { sudokus } from "@/lib/schema";
import { GameState, Coordinates, BoardValidityState } from "@/shared/types";
import { getBoardValidityState } from "@/shared/validate";
import { useEffect, useState } from "react";

export function useGame(sudoku: typeof sudokus.$inferSelect) {
  const [gameState, setGameState] = useState<GameState>(sudoku.puzzle);
  const [boardValidityState, setBoardValidityState] =
    useState<BoardValidityState>(getBoardValidityState(gameState));

  function updateCellValue([rowId, colId]: Coordinates, value: number | null) {
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

  useEffect(() => {
    setBoardValidityState(getBoardValidityState(gameState));
  }, [gameState]);

  return {
    gameState,
    boardValidityState,
    setGameState,
    updateCellValue,
  };
}
