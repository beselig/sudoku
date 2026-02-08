"use server";

import { Board } from "@/components/Board";
import { fetchSudoku } from "@/server/sudokus";
import { redirect } from "next/navigation";

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sudoku = await fetchSudoku(id);

  if (!sudoku) {
    redirect("/404");
  }

  return (
    <div>
      <main className="min-h-screen py-32 px-14">
        <h1 className="text-3xl my-4">{sudoku.id}</h1>
        {sudoku ? <Board sudoku={sudoku} /> : null}
      </main>
    </div>
  );
}
