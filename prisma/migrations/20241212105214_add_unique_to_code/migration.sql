/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Invitation_code_key` ON `Invitation`(`code`);
