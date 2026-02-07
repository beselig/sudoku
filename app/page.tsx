import { Game } from "@/components/Game";
import { fetchSudoku } from "@/server/fetchSudokus";

export default async function Home() {
  const sudoku = await fetchSudoku("9bf60646-e034-44d7-92fe-7c73a5f829cb");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {sudoku ? <Game sudoku={sudoku} /> : null}
      </main>
    </div>
  );
}
