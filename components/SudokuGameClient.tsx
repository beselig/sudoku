"use client";

import { useGame } from "@/hooks/useGame";
import { SudokuGrid } from "./SudokuGrid";
import { SudokuContainer } from "./SudokuContainer";
import { Puzzle } from "@/shared/types";
import { Sudoku } from "@/generated/prisma/client";

export type SudokuGameClientProps = {
  sudoku: Sudoku;
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
    <SudokuContainer onKeyDown={handleKeyDown} className="min-w-sm">
      <SudokuGrid
        puzzle={sudoku.puzzle as Puzzle}
        grid={gameState}
        boardValidityState={boardValidityState}
        activeCell={activeCell}
        cellUpdateAction={updateCellValue}
      />
    </SudokuContainer>
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
