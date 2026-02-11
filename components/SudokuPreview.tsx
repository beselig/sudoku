import { sudokus } from "@/lib/schema";
import { SudokuGrid } from "./SudokuGrid";
import { SudokuCellList } from "./SudokuCellList";

export function SudokuPreview({
  sudoku,
}: {
  sudoku: typeof sudokus.$inferSelect;
}) {
  return (
    <SudokuGrid className="pointer-events-none">
      <SudokuCellList grid={sudoku.puzzle} puzzle={sudoku.puzzle} preview />
    </SudokuGrid>
  );
}
