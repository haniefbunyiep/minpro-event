/*
  Warnings:

  - Added the required column `eo` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `eo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_eo_fkey` FOREIGN KEY (`eo`) REFERENCES `event_organizers`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
