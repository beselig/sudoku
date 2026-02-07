ALTER TABLE "sudokus" ADD COLUMN "puzzle" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "sudokus" DROP COLUMN "statics";