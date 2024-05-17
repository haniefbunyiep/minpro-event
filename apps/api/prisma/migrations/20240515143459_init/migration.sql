/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `eventName` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userFullname` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `eventName`,
    DROP COLUMN `userFullname`;

-- CreateTable
CREATE TABLE `transactions_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ticketType` INTEGER NOT NULL,
    `buyDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions_detail` ADD CONSTRAINT `transactions_detail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions_detail` ADD CONSTRAINT `transactions_detail_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions_detail` ADD CONSTRAINT `transactions_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions_detail` ADD CONSTRAINT `transactions_detail_ticketType_fkey` FOREIGN KEY (`ticketType`) REFERENCES `event_tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
