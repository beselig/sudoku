import { atom } from "jotai";
import { Coordinates } from "./types";

export const currentActiveValueAtom = atom<number | null>(null);
export const activeCellAtom = atom<Coordinates | null>(null);
