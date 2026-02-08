import { Board } from "@/components/Board";
import { fetchSudokus } from "@/server/sudokus";
import Link from "next/link";

export default async function Home() {
  const sudokus = await fetchSudokus({});

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold mb-3 mt-2">Puzzles</h1>
        <div className="grid grid-cols-3 gap-4 size-full">
          {sudokus.map((sudoku) => (
            <div key={sudoku.id} className="w-full">
              <Link href={`/game/${sudoku.id}`}>
                <Board sudoku={sudoku} preview />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
