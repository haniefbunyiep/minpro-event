/*
  Warnings:

  - You are about to drop the column `userId` on the `use_referral` table. All the data in the column will be lost.
  - Added the required column `referralCodeId` to the `use_referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useBy` to the `use_referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `use_referral` DROP FOREIGN KEY `use_referral_userId_fkey`;

-- AlterTable
ALTER TABLE `use_referral` DROP COLUMN `userId`,
    ADD COLUMN `referralCodeId` INTEGER NOT NULL,
    ADD COLUMN `useBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `use_referral` ADD CONSTRAINT `use_referral_referralCodeId_fkey` FOREIGN KEY (`referralCodeId`) REFERENCES `referral_code`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `use_referral` ADD CONSTRAINT `use_referral_useBy_fkey` FOREIGN KEY (`useBy`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
