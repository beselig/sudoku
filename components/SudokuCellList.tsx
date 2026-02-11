import { sudokus } from "@/lib/schema";
import { GameState, Coordinates, BoardValidityState } from "@/shared/types";
import { SudokuCell } from "./SudokuCell";

export type SudokuCellListProps = {
  puzzle: (typeof sudokus.$inferSelect)["puzzle"];
  grid: GameState;
  cellUpdateAction?: (location: Coordinates, value: number | null) => void;
  activeCell?: Coordinates | null;
  preview?: boolean;
  boardValidityState?: BoardValidityState;
};

export function SudokuCellList({
  grid,
  puzzle,
  cellUpdateAction,
  activeCell,
  boardValidityState,
  preview = false,
}: SudokuCellListProps) {
  return grid.map((row, rowId) =>
    row.map((col, colId) => (
      <SudokuCell
        key={`${rowId}-${colId}`}
        value={col}
        coordinates={[rowId, colId]}
        valueChangeAction={cellUpdateAction}
        isStatic={!!puzzle[rowId][colId]}
        preview={preview}
        isValid={boardValidityState?.[rowId][colId] ?? true}
        isActive={activeCell?.[0] === rowId && activeCell?.[1] === colId}
      />
    )),
  );
}
