/*
  Warnings:

  - You are about to alter the column `total` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Reservation` MODIFY `total` INTEGER NOT NULL;
