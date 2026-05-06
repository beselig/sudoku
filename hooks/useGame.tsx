import type { Sudoku } from "@/generated/prisma/client";
import { activeCellAtom } from "@/shared/atoms";
import { Puzzle, Coordinates, BoardValidityState } from "@/shared/types";
import { getBoardValidityState } from "@/shared/validate";
import { useAtom } from "jotai";
import { KeyboardEvent, useEffect, useState } from "react";

export type GameStateHistory = {
    coordinates: Coordinates;
    previous: number | null;
    next: number | null;
}[];

export function useGame(sudoku: Sudoku) {
    const [gameStateHistory, setGameStateHistory] = useState<GameStateHistory>(
        [],
    );
    const [gameState, setGameState] = useState<Puzzle>(sudoku.puzzle as Puzzle);
    const [boardValidityState, setBoardValidityState] =
        useState<BoardValidityState>(getBoardValidityState(gameState));
    const [activeCell, setActiveCell] = useAtom(activeCellAtom);
    const [undoCursor, setUndoCursor] = useState(0);

    useEffect(() => {
        setBoardValidityState(getBoardValidityState(gameState));
    }, [gameState]);

    useEffect(() => {
        return () => {
            setActiveCell(null);
            setBoardValidityState(null);
        };
    }, []);

    function updateCellValue(
        [rowId, colId]: Coordinates,
        value: number | null,
        updateHistory = true,
    ) {
        if (updateHistory) {
            setGameStateHistory([
                ...gameStateHistory.slice(
                    0,
                    gameStateHistory.length - undoCursor,
                ),
                {
                    coordinates: [rowId, colId],
                    previous: gameState[rowId][colId],
                    next: value,
                },
            ]);
            setUndoCursor(0);
        }

        setGameState(
            gameState.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    if (rowIndex === rowId && colIndex === colId) {
                        return value;
                    }
                    return col;
                });
            }),
        );
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (!e.key.includes("Arrow") || !activeCell) return;

        e.preventDefault();

        switch (e.key) {
            case "ArrowUp":
                if (activeCell[0] === 0) {
                    break;
                }
                setActiveCell([activeCell[0] - 1, activeCell[1]]);
                break;
            case "ArrowDown":
                if (activeCell[0] === 8) {
                    break;
                }
                setActiveCell([activeCell[0] + 1, activeCell[1]]);
                break;
            case "ArrowLeft":
                if (activeCell[1] === 0) {
                    break;
                }
                setActiveCell([activeCell[0], activeCell[1] - 1]);
                break;
            case "ArrowRight":
                if (activeCell[1] === 8) {
                    break;
                }
                setActiveCell([activeCell[0], activeCell[1] + 1]);
                break;
        }
    }

    const [undoable, setUndoable] = useState(false);
    const [redoable, setRedoable] = useState(false);

    function undo() {
        console.log(gameStateHistory.length - undoCursor < 1);
        if (gameStateHistory.length - undoCursor < 1) return;

        const changeIndex = gameStateHistory.length - undoCursor - 1;
        const change = gameStateHistory[changeIndex];

        updateCellValue(change.coordinates, change.previous, false);
        setUndoCursor(undoCursor + 1);
    }

    function redo() {
        if (undoCursor === 0) return;

        const changeIndex = gameStateHistory.length - undoCursor;
        const change = gameStateHistory[changeIndex];
        // console.log(gameStateHistory.length, undoCursor, changeIndex, change);

        console.log(undoCursor);
        if (undoCursor === 1) {
            return updateCellValue(change.coordinates, change.next, true);
        }

        updateCellValue(change.coordinates, change.next, false);
        setUndoCursor(undoCursor - 1);
    }

    useEffect(() => {
        if (gameStateHistory.length - undoCursor > 0) {
            setUndoable(true);
        } else {
            setUndoable(false);
        }

        if (undoCursor > 0) {
            setRedoable(true);
        } else {
            setRedoable(false);
        }
    }, [gameStateHistory, undoCursor]);

    return {
        undo,
        redo,
        undoable,
        redoable,
        gameStateHistory,
        gameState,
        activeCell,
        boardValidityState,
        updateCellValue,
        handleKeyDown,
    };
}
