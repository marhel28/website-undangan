-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_bankId_fkey`;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
