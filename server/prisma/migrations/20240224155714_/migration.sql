/*
  Warnings:

  - Added the required column `location` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Yacht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `location` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Yacht` ADD COLUMN `location` VARCHAR(191) NOT NULL;
