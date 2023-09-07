/*
  Warnings:

  - Added the required column `bloodTypeId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `bloodTypeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_bloodTypeId_fkey` FOREIGN KEY (`bloodTypeId`) REFERENCES `bloodtype`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
