-- DropForeignKey
ALTER TABLE `donation` DROP FOREIGN KEY `Donation_invitationId_fkey`;

-- DropForeignKey
ALTER TABLE `invitationgreeting` DROP FOREIGN KEY `InvitationGreeting_invitationId_fkey`;

-- AddForeignKey
ALTER TABLE `InvitationGreeting` ADD CONSTRAINT `InvitationGreeting_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
