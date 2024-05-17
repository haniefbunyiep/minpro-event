/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `name` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `ticketType` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `eventId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `name`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `eventName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL,
    MODIFY `ticketType` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_ticketType_fkey` FOREIGN KEY (`ticketType`) REFERENCES `event_tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
