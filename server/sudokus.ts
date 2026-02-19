"use server";

import { prisma } from "@/lib/db";

export async function fetchSudokus({
  offset = 0,
  limit = 25,
}: {
  offset?: number;
  limit?: number;
}) {
  // return await db.select().from(sudokus).offset(offset).limit(limit);
  return await prisma.sudokus.findMany({
    skip: offset,
    take: limit,
  });
}

export async function fetchSudoku(id: string) {
  return await prisma.sudokus.findFirst({ where: { id } });
}
