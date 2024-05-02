/*
  Warnings:

  - Added the required column `voucherCode` to the `user_voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_voucher` ADD COLUMN `voucherCode` VARCHAR(191) NOT NULL;
