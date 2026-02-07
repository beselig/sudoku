"use server";

import { db } from "@/lib/db";
import { sudokus } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function fetchSudokus({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  // return await db.select().from(sudokus).offset(offset).limit(limit);
  return await db.query.sudokus.findMany({
    offset,
    limit,
  });
}

export async function fetchSudoku(id: string) {
  return await db.query.sudokus.findFirst({ where: eq(sudokus.id, id) });
}
