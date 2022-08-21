/*
  Warnings:

  - The `links` column on the `ProjectExpense` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `ProjectExpense` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProjectExpense" ALTER COLUMN "costRangeFrom" DROP NOT NULL,
ALTER COLUMN "costRangeTo" DROP NOT NULL,
ALTER COLUMN "costActual" DROP NOT NULL,
ALTER COLUMN "progressPercentage" DROP NOT NULL,
ALTER COLUMN "meta" SET DEFAULT '{}',
ALTER COLUMN "conditions" SET DEFAULT '[]',
DROP COLUMN "links",
ADD COLUMN     "links" JSONB NOT NULL DEFAULT '[]',
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL DEFAULT '[]';
