import { sudokus } from "@/lib/schema";
import { activeCellAtom } from "@/shared/atoms";
import { Puzzle, Coordinates, BoardValidityState } from "@/shared/types";
import { getBoardValidityState } from "@/shared/validate";
import { useAtom } from "jotai";
import { KeyboardEvent, useEffect, useState } from "react";

export function useGame(sudoku: SudokusSelect) {
  const [gameState, setGameState] = useState<Puzzle>(sudoku.puzzle);
  const [boardValidityState, setBoardValidityState] =
    useState<BoardValidityState>(getBoardValidityState(gameState));
  const [activeCell, setActiveCell] = useAtom(activeCellAtom);

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

  useEffect(() => {
    return () => {
      console.log("reset");
      setActiveCell(null);
      setBoardValidityState(null);
    };
  }, []);

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

  return {
    gameState,
    activeCell,
    boardValidityState,
    setGameState,
    updateCellValue,
    handleKeyDown,
  };
}
