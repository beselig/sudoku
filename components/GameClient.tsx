"use client";

import { useGame } from "@/hooks/useGame";
import { sudokus } from "@/lib/schema";
import { Board } from "./Board";

export function GameClient({
  sudoku,
}: {
  sudoku: typeof sudokus.$inferSelect;
}) {
  const { gameState, boardValidityState, updateCellValue } = useGame(sudoku);

  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);

  return (
    <>
      <Board
        puzzle={sudoku.puzzle}
        gameState={gameState}
        boardValidityState={boardValidityState}
        cellUpdateAction={updateCellValue}
      />
    </>
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
