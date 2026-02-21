"use client";
import { Puzzle } from "@/shared/types";
import { SudokuContainer } from "./SudokuContainer";
import { SudokuGrid } from "./SudokuGrid";
import { sudokus } from "@/generated/prisma/client";

export function SudokuPreview({ sudoku }: { sudoku: sudokus }) {
  return (
    <SudokuContainer className="pointer-events-none">
      <SudokuGrid
        grid={sudoku.puzzle as Puzzle}
        puzzle={sudoku.puzzle as Puzzle}
        preview
      />
    </SudokuContainer>
  );
}
