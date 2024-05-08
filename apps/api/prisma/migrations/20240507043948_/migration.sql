/*
  Warnings:

  - You are about to drop the column `endTime` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `events` table. All the data in the column will be lost.
  - Added the required column `time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    ADD COLUMN `time` TIME NOT NULL;
