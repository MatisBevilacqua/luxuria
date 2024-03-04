/*
  Warnings:

  - You are about to alter the column `url` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Image` MODIFY `url` VARCHAR(191) NOT NULL;
