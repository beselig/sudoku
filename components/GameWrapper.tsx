"use client";

import { useEffect, useState } from "react";
import { Board } from "./Board";
import { sudokus } from "@/lib/schema";
import { BoardState } from "@/shared/types";

export function GameClient({
  sudoku,
}: {
  sudoku: typeof sudokus.$inferSelect;
}) {
  const [gameState, setGameState] = useState<BoardState>(puzzle);
  const [boardValidityState, setBoardValidityState] = useEffect(() => {
    setBoardValidityState(getBoardValidityState(gameState));
  }, [gameState]);

  useState<BoardValidityMap>(getBoardValidityState(gameState));
  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);

  return (
    <>
      <Board puzzle={sudoku.puzzle} />
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
