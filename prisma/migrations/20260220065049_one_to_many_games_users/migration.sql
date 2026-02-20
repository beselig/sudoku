/*
  Warnings:

  - Added the required column `playerId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "playerId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
