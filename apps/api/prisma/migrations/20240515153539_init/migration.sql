/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `subTotal` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaymant` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `pointUse` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `subTotal` INTEGER NOT NULL,
    ADD COLUMN `totalPaymant` INTEGER NOT NULL;
