/*
  Warnings:

  - You are about to alter the column `time` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `date` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `buyDate` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` MODIFY `time` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `date`,
    DROP COLUMN `time`,
    ADD COLUMN `buyDate` DATE NOT NULL;
