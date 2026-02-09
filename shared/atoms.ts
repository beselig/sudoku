import { atom } from "jotai";
import { Coordinates } from "./types";

export const highlightedValueAtom = atom<number | null>(null);
export const activeCellAtom = atom<Coordinates | null>(null);
