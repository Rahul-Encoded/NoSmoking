/*
  Warnings:

  - You are about to drop the column `costSpent` on the `SmokeLogs` table. All the data in the column will be lost.
  - You are about to drop the column `penaltyMinutes` on the `SmokeLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmokeLogs" DROP COLUMN "costSpent",
DROP COLUMN "penaltyMinutes";
