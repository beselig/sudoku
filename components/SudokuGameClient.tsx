"use client";

import { GameStateHistory, useGame } from "@/hooks/useGame";
import { SudokuGrid } from "./SudokuGrid";
import { SudokuContainer } from "./SudokuContainer";
import { Puzzle } from "@/shared/types";
import type { Sudoku } from "@/generated/prisma/client";
import { Undo2 as Undo, Redo2 as Redo } from "lucide-react";

export type SudokuGameClientProps = {
    sudoku: Sudoku;
};

export function SudokuGameClient({ sudoku }: SudokuGameClientProps) {
    const {
        gameStateHistory,
        gameState,
        boardValidityState,
        undoable,
        redoable,
        undo,
        redo,
        updateCellValue,
        handleKeyDown,
        activeCell,
    } = useGame(sudoku);

    // useEffect(() => {
    //   registerServiceWorker();
    // }, []);

    return (
        <>
            <SudokuContainer onKeyDown={handleKeyDown} className="min-w-sm">
                <SudokuGrid
                    puzzle={sudoku.puzzle as Puzzle}
                    grid={gameState}
                    boardValidityState={boardValidityState}
                    activeCell={activeCell}
                    cellUpdateAction={updateCellValue}
                />
            </SudokuContainer>
            <div className="flex gap-4 py-4">
                <button
                    onClick={undo}
                    disabled={!undoable}
                    className="disabled:opacity-30 not-disabled:cursor-pointer bg-gray-400 rounded-md p-1"
                >
                    <Undo strokeWidth={3} size={32} className="text-gray-700" />
                </button>
                <button
                    onClick={redo}
                    disabled={!redoable}
                    className="disabled:opacity-30 not-disabled:cursor-pointer bg-gray-400 rounded-md p-1"
                >
                    <Redo strokeWidth={3} size={32} className="text-gray-700" />
                </button>
            </div>
            {process.env.NODE_ENV === "development" && (
                <HistoryViewer history={gameStateHistory} />
            )}
        </>
    );
}

function HistoryViewer({ history }: { history: GameStateHistory }) {
    return (
        <div>
            <pre>{JSON.stringify(history, null, 2)}</pre>
        </div>
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
