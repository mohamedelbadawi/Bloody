/*
  Warnings:

  - Added the required column `description` to the `bloodRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bloodrequest` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `donorById` VARCHAR(191) NULL,
    ADD COLUMN `receiverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `bloodRequest` ADD CONSTRAINT `bloodRequest_donorById_fkey` FOREIGN KEY (`donorById`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bloodRequest` ADD CONSTRAINT `bloodRequest_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
