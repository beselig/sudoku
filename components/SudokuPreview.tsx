import { sudokus } from "@/lib/schema";
import { SudokuGrid } from "./SudokuGrid";

export function SudokuPreview({
  sudoku,
}: {
  sudoku: typeof sudokus.$inferSelect;
}) {
  return <SudokuGrid></SudokuGrid>;
}
