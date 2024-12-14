/*
  Warnings:

  - Added the required column `recipient` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank` ADD COLUMN `recipient` VARCHAR(191) NOT NULL;
