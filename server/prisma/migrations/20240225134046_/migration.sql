/*
  Warnings:

  - Added the required column `adress` to the `ClientReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ClientReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ClientReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClientReservation` ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
