/*
  Warnings:

  - You are about to drop the `event_organizers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_organizers` DROP FOREIGN KEY `event_organizers_roleId_fkey`;

-- DropTable
DROP TABLE `event_organizers`;
