/*
  Warnings:

  - You are about to drop the column `voucherUse` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `voucherUse` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `voucherUse`,
    MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `voucherUse` VARCHAR(191) NOT NULL;
