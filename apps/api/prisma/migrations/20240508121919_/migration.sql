-- DropForeignKey
ALTER TABLE `event_vouchers` DROP FOREIGN KEY `event_vouchers_id_fkey`;

-- AddForeignKey
ALTER TABLE `event_vouchers` ADD CONSTRAINT `event_vouchers_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
