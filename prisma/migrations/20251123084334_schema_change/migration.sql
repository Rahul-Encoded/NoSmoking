/*
  Warnings:

  - You are about to drop the `HabitState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitState" DROP CONSTRAINT "HabitState_userId_fkey";

-- DropTable
DROP TABLE "HabitState";

-- CreateTable
CREATE TABLE "NonSmokeLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NonSmokeLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NonSmokeLogs" ADD CONSTRAINT "NonSmokeLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
