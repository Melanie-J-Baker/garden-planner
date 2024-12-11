-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gardens" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Gardens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plants" (
    "id" SERIAL NOT NULL,
    "common_name" TEXT,
    "scientific_name" TEXT NOT NULL,
    "cycle" TEXT,
    "watering" TEXT,
    "sunlight" TEXT[],
    "image_url" TEXT,
    "indoor" BOOLEAN DEFAULT false,
    "poisonous" BOOLEAN DEFAULT false,
    "type" TEXT,
    "dimensions_min" DOUBLE PRECISION,
    "dimensions_max" DOUBLE PRECISION,
    "dimensions_unit" TEXT,
    "pruning_months" TEXT[],
    "pruning_count_amount" INTEGER,
    "pruning_count_interval" TEXT,
    "hardiness_min" TEXT,
    "hardiness_max" TEXT,
    "flowering_season" TEXT,
    "description" TEXT,
    "growth_rate" TEXT,
    "garden_id" INTEGER NOT NULL,

    CONSTRAINT "Plants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Gardens" ADD CONSTRAINT "Gardens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plants" ADD CONSTRAINT "Plants_garden_id_fkey" FOREIGN KEY ("garden_id") REFERENCES "Gardens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
