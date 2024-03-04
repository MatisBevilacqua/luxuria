/*
  Warnings:

  - Added the required column `total` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `total` VARCHAR(191) NOT NULL;
