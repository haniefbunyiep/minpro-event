/*
  Warnings:

  - You are about to drop the column `eo` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `eoUsername` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_eo_fkey`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `eo`,
    ADD COLUMN `eoUsername` VARCHAR(191) NOT NULL,
    MODIFY `time` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_eoUsername_fkey` FOREIGN KEY (`eoUsername`) REFERENCES `event_organizers`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
