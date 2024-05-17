/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `eventId` to the `event_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_reviews` ADD COLUMN `eventId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `event_reviews` ADD CONSTRAINT `event_reviews_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
