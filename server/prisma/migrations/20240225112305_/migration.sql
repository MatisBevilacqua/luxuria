/*
  Warnings:

  - You are about to drop the column `availabilityId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Availability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Availability` DROP FOREIGN KEY `Availability_carId_fkey`;

-- DropForeignKey
ALTER TABLE `Availability` DROP FOREIGN KEY `Availability_yachtId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_availabilityId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `availabilityId`;

-- DropTable
DROP TABLE `Availability`;
