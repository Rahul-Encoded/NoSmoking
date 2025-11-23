/*
  Warnings:

  - You are about to drop the column `currLifeExpectancy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currLifeExpectancy",
ADD COLUMN     "totalSmokes" DOUBLE PRECISION;
