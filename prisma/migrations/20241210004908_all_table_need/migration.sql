-- CreateTable
CREATE TABLE `Wedding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groomName` VARCHAR(191) NOT NULL,
    `groomMotherName` VARCHAR(191) NOT NULL,
    `groomFatherName` VARCHAR(191) NOT NULL,
    `groomAddress` VARCHAR(191) NOT NULL,
    `brideName` VARCHAR(191) NOT NULL,
    `brideMotherName` VARCHAR(191) NOT NULL,
    `brideFatherName` VARCHAR(191) NOT NULL,
    `brideAddress` VARCHAR(191) NOT NULL,
    `akadDate` DATETIME(3) NOT NULL,
    `akadTime` VARCHAR(191) NOT NULL,
    `akadLocation` VARCHAR(191) NOT NULL,
    `akadGoogleMapLink` VARCHAR(191) NOT NULL,
    `resepsiDate` DATETIME(3) NOT NULL,
    `resepsiTime` VARCHAR(191) NOT NULL,
    `resepsiLocation` VARCHAR(191) NOT NULL,
    `resepsiGoogleMapLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `presence` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvitationGreeting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `greeting` VARCHAR(191) NOT NULL,
    `invitationId` INTEGER NOT NULL,

    INDEX `InvitationGreeting_invitationId_idx`(`invitationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nominal` INTEGER NOT NULL,
    `bankId` INTEGER NOT NULL,
    `invitationId` INTEGER NOT NULL,

    INDEX `Donation_bankId_idx`(`bankId`),
    INDEX `Donation_invitationId_idx`(`invitationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `accountNumber` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InvitationGreeting` ADD CONSTRAINT `InvitationGreeting_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_invitationId_fkey` FOREIGN KEY (`invitationId`) REFERENCES `Invitation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
