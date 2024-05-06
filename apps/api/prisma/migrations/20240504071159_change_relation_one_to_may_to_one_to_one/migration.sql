/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `event_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `event_images_eventId_key` ON `event_images`(`eventId`);
