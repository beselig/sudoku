-- CreateTable
CREATE TABLE "games" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "state" JSONB NOT NULL,
    "updated_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sudokus" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "solution" JSONB NOT NULL,
    "updated_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "puzzle" JSONB NOT NULL,

    CONSTRAINT "sudokus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR,
    "updated_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
