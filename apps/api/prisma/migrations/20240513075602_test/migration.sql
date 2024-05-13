/*
  Warnings:

  - You are about to drop the column `eo` on the `events` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_eo_fkey`;

-- AlterTable
ALTER TABLE `events` DROP COLUMN `eo`;
