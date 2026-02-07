import { uuid, jsonb, pgTable } from "drizzle-orm/pg-core";

export const sudokus = pgTable("sudokus", {
  id: uuid().primaryKey().defaultRandom(),
  solution: jsonb("solution").$type<number[][]>().notNull(),
  statics: jsonb("statics").$type<number[][]>().notNull(),
});
