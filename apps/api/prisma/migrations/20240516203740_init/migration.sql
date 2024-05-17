/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `voucherId` to the `use_user_voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `use_user_voucher` ADD COLUMN `voucherId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `use_user_voucher` ADD CONSTRAINT `use_user_voucher_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `user_voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
