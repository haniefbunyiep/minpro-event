/*
  Warnings:

  - You are about to drop the column `discount` on the `event_promotions` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `event_vouchers` table. All the data in the column will be lost.
  - You are about to drop the column `limited` on the `event_vouchers` table. All the data in the column will be lost.
  - You are about to drop the column `pieces` on the `event_vouchers` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `event_vouchers` table. All the data in the column will be lost.
  - Added the required column `discountVoucher` to the `event_vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_promotions` DROP COLUMN `discount`;

-- AlterTable
ALTER TABLE `event_vouchers` DROP COLUMN `endDate`,
    DROP COLUMN `limited`,
    DROP COLUMN `pieces`,
    DROP COLUMN `startDate`,
    ADD COLUMN `discountVoucher` INTEGER NOT NULL;
