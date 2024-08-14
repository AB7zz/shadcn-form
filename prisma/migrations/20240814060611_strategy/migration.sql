/*
  Warnings:

  - You are about to drop the column `amsiStrategy` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `fomoStrategy` on the `Company` table. All the data in the column will be lost.
  - Added the required column `strategy` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "amsiStrategy",
DROP COLUMN "fomoStrategy",
ADD COLUMN     "strategy" TEXT NOT NULL;
