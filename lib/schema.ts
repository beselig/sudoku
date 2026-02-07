import { varchar, uuid, jsonb, pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const sudokus = pgTable("sudokus", {
  id: uuid().primaryKey().defaultRandom(),
  solution: jsonb("solution").$type<number[][]>().notNull(),
  puzzle: jsonb("puzzle").$type<number[][]>().notNull(),
  ...timestamps,
});

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar(),
  ...timestamps,
});
