/*
  Warnings:

  - Added the required column `clientReservationId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_carId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_yachtId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `clientReservationId` INTEGER NOT NULL,
    MODIFY `carId` INTEGER NULL,
    MODIFY `yachtId` INTEGER NULL;

-- CreateTable
CREATE TABLE `ClientReservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Reservation_clientReservationId_fkey` ON `Reservation`(`clientReservationId`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_yachtId_fkey` FOREIGN KEY (`yachtId`) REFERENCES `Yacht`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_clientReservationId_fkey` FOREIGN KEY (`clientReservationId`) REFERENCES `ClientReservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
