/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP PRIMARY KEY,
    DROP COLUMN `bio`,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`username`);

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Proxy` (
    `baseURL` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`baseURL`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `label` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedOn` DATETIME(3) NOT NULL,
    `profileCreatedByUsername` VARCHAR(191) NOT NULL,
    `profileUpdatedByUsername` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endpoint` (
    `path` VARCHAR(191) NOT NULL,
    `method` ENUM('GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE') NOT NULL,
    `hidden` BOOLEAN NOT NULL,
    `locked` BOOLEAN NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedOn` DATETIME(3) NOT NULL,
    `endpointUpdatedByProfile` VARCHAR(191) NOT NULL,
    `endpointCreatedByProfile` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Behavior` (
    `action` ENUM('RESPOND', 'INSERT_DB', 'MUTATE_DB') NOT NULL,
    `endpointId` VARCHAR(191) NULL,

    PRIMARY KEY (`action`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Content` (
    `source` ENUM('PROXY', 'MODEL_DATA', 'PAYLOAD', 'INJECT', 'STATUS_CODE') NOT NULL,
    `proxyConfigProxyBaseURL` VARCHAR(191) NULL,
    `behaviorAction` ENUM('RESPOND', 'INSERT_DB', 'MUTATE_DB') NOT NULL,

    UNIQUE INDEX `Content_source_key`(`source`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Filter` (
    `type` ENUM('INDEX', 'FIELD') NOT NULL,
    `field` VARCHAR(191) NULL,
    `value` VARCHAR(191) NOT NULL,
    `contentSource` ENUM('PROXY', 'MODEL_DATA', 'PAYLOAD', 'INJECT', 'STATUS_CODE') NOT NULL,
    `behaviorTriggerAction` ENUM('RESPOND', 'INSERT_DB', 'MUTATE_DB') NOT NULL,
    `behaviorSelectorAction` ENUM('RESPOND', 'INSERT_DB', 'MUTATE_DB') NOT NULL,

    UNIQUE INDEX `Filter_type_value_key`(`type`, `value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProxyConfig` (
    `path` VARCHAR(191) NOT NULL,
    `proxyBaseURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`proxyBaseURL`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelDataConfig` (
    `modelLabel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`modelLabel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusConfig` (
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_profileCreatedByUsername_fkey` FOREIGN KEY (`profileCreatedByUsername`) REFERENCES `Profile`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Model` ADD CONSTRAINT `Model_profileUpdatedByUsername_fkey` FOREIGN KEY (`profileUpdatedByUsername`) REFERENCES `Profile`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endpoint` ADD CONSTRAINT `Endpoint_endpointCreatedByProfile_fkey` FOREIGN KEY (`endpointCreatedByProfile`) REFERENCES `Profile`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endpoint` ADD CONSTRAINT `Endpoint_endpointUpdatedByProfile_fkey` FOREIGN KEY (`endpointUpdatedByProfile`) REFERENCES `Profile`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Behavior` ADD CONSTRAINT `Behavior_endpointId_fkey` FOREIGN KEY (`endpointId`) REFERENCES `Endpoint`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_proxyConfigProxyBaseURL_fkey` FOREIGN KEY (`proxyConfigProxyBaseURL`) REFERENCES `ProxyConfig`(`proxyBaseURL`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_behaviorAction_fkey` FOREIGN KEY (`behaviorAction`) REFERENCES `Behavior`(`action`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Filter` ADD CONSTRAINT `Filter_contentSource_fkey` FOREIGN KEY (`contentSource`) REFERENCES `Content`(`source`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Filter` ADD CONSTRAINT `Filter_behaviorTriggerAction_fkey` FOREIGN KEY (`behaviorTriggerAction`) REFERENCES `Behavior`(`action`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Filter` ADD CONSTRAINT `Filter_behaviorSelectorAction_fkey` FOREIGN KEY (`behaviorSelectorAction`) REFERENCES `Behavior`(`action`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProxyConfig` ADD CONSTRAINT `ProxyConfig_proxyBaseURL_fkey` FOREIGN KEY (`proxyBaseURL`) REFERENCES `Proxy`(`baseURL`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModelDataConfig` ADD CONSTRAINT `ModelDataConfig_modelLabel_fkey` FOREIGN KEY (`modelLabel`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
