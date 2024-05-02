/*
  Warnings:

  - You are about to drop the `User_Voucher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User_Voucher` DROP FOREIGN KEY `User_Voucher_userId_fkey`;

-- DropTable
DROP TABLE `User_Voucher`;

-- CreateTable
CREATE TABLE `user_voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `discountInPercent` INTEGER NOT NULL,
    `expireAt` DATE NOT NULL,
    `status` ENUM('EXPIRED', 'ACTIVE', 'USED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_voucher` ADD CONSTRAINT `user_voucher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
