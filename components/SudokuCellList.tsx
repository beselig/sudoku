import { sudokus } from "@/lib/schema";
import { GameState, Coordinates, BoardValidityState } from "@/shared/types";
import { Cell } from "./Cell";

export function SudokuCellList({
  grid,
  puzzle,
  cellUpdateAction,
  activeCell,
  boardValidityState,
  preview = false,
}: {
  puzzle: (typeof sudokus.$inferSelect)["puzzle"];
  grid: GameState;
  cellUpdateAction?: (location: Coordinates, value: number | null) => void;
  activeCell?: Coordinates | null;
  preview?: boolean;
  boardValidityState?: BoardValidityState;
}) {
  return grid.map((row, rowId) =>
    row.map((col, colId) => {
      return (
        <Cell
          key={`${rowId}-${colId}`}
          value={col}
          coordinates={[rowId, colId]}
          valueChangeAction={cellUpdateAction}
          isStatic={!!puzzle[rowId][colId]}
          preview={preview}
          isValid={boardValidityState?.[rowId][colId] ?? true}
          isActive={activeCell?.[0] === rowId && activeCell?.[1] === colId}
        />
      );
    }),
  );
}
