"use client";

import { useGame } from "@/hooks/useGame";
import { sudokus } from "@/lib/schema";
import { SudokuCellList } from "./SudokuCellList";
import { SudokuGrid } from "./SudokuGrid";

export type SudokuGameClientProps = {
  sudoku: typeof sudokus.$inferSelect;
};

export function SudokuGameClient({ sudoku }: SudokuGameClientProps) {
  const {
    gameState,
    boardValidityState,
    updateCellValue,
    handleKeyDown,
    activeCell,
  } = useGame(sudoku);

  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);

  return (
    <SudokuGrid onKeyDown={handleKeyDown} className="min-w-sm">
      <SudokuCellList
        puzzle={sudoku.puzzle}
        grid={gameState}
        boardValidityState={boardValidityState}
        activeCell={activeCell}
        cellUpdateAction={updateCellValue}
      />
    </SudokuGrid>
  );
}

// const registerServiceWorker = async () => {
//   if ("serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.register(
//         "./service-worker.js",
//         {
//           scope: "/",
//         },
//       );
//       if (registration.installing) {
//         console.log("Service worker installing");
//       } else if (registration.waiting) {
//         console.log("Service worker installing");
//       } else if (registration.active) {
//         console.log("Service worker active");
//       }
//     } catch (error) {
//       console.error(`Registration failed with ${error}`);
//     }
//   }
// };
