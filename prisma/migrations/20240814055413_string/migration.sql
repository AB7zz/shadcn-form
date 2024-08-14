/*
  Warnings:

  - Made the column `fomoStrategy` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amsiStrategy` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file1` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file2` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "fomoStrategy" SET NOT NULL,
ALTER COLUMN "amsiStrategy" SET NOT NULL,
ALTER COLUMN "file1" SET NOT NULL,
ALTER COLUMN "file2" SET NOT NULL;
