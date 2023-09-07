/*
  Warnings:

  - Added the required column `bloodTypeId` to the `bloodRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bloodrequest` ADD COLUMN `bloodTypeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `donationCompletedAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('pending', 'canceled', 'completed') NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE `bloodRequest` ADD CONSTRAINT `bloodRequest_bloodTypeId_fkey` FOREIGN KEY (`bloodTypeId`) REFERENCES `bloodtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
