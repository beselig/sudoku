import { db } from "@/lib/db";
import { games } from "@/lib/schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const gameState = request.json();
  await db
    .insert(games)
    .values({
      state: gameState,
    })
    .onConflictDoUpdate({
      target: games.id,
      set: { state: gameState },
    });
}
