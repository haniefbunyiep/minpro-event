/*
  Warnings:

  - You are about to drop the column `userId` on the `event_promotions` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `event_promotions` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `event_vouchers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codeVoucher` to the `event_promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountVoucher` to the `event_promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `event_promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stok` to the `event_promotions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event_promotions` DROP FOREIGN KEY `event_promotions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `event_promotions` DROP FOREIGN KEY `event_promotions_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `event_vouchers` DROP FOREIGN KEY `event_vouchers_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `event_vouchers` DROP FOREIGN KEY `event_vouchers_ticketId_fkey`;

-- AlterTable
ALTER TABLE `event_promotions` DROP COLUMN `userId`,
    DROP COLUMN `voucherId`,
    ADD COLUMN `codeVoucher` VARCHAR(191) NOT NULL,
    ADD COLUMN `discountVoucher` INTEGER NOT NULL,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `stok` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE `event_vouchers`;

-- AddForeignKey
ALTER TABLE `event_promotions` ADD CONSTRAINT `event_promotions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
