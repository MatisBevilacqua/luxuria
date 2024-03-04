/*
  Warnings:

  - Added the required column `city` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Yacht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `city` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Yacht` ADD COLUMN `city` VARCHAR(191) NOT NULL;
