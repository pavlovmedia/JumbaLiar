-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Behavior`;
CREATE TABLE `Behavior` (
  `action` enum('RESPOND','INSERT_DB','MUTATE_DB') COLLATE utf8mb4_unicode_ci NOT NULL,
  `endpointId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`action`),
  KEY `Behavior_endpointId_fkey` (`endpointId`),
  CONSTRAINT `Behavior_endpointId_fkey` FOREIGN KEY (`endpointId`) REFERENCES `Endpoint` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Content`;
CREATE TABLE `Content` (
  `source` enum('PROXY','MODEL_DATA','PAYLOAD','INJECT','STATUS_CODE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `proxyConfigProxyBaseURL` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `behaviorAction` enum('RESPOND','INSERT_DB','MUTATE_DB') COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `Content_source_key` (`source`),
  KEY `Content_proxyConfigProxyBaseURL_fkey` (`proxyConfigProxyBaseURL`),
  KEY `Content_behaviorAction_fkey` (`behaviorAction`),
  CONSTRAINT `Content_behaviorAction_fkey` FOREIGN KEY (`behaviorAction`) REFERENCES `Behavior` (`action`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Content_proxyConfigProxyBaseURL_fkey` FOREIGN KEY (`proxyConfigProxyBaseURL`) REFERENCES `ProxyConfig` (`proxyBaseURL`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Endpoint`;
CREATE TABLE `Endpoint` (
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` enum('GET','POST','PUT','PATCH','OPTIONS','DELETE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedOn` datetime(3) NOT NULL,
  `endpointUpdatedByProfile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endpointCreatedByProfile` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Endpoint_endpointCreatedByProfile_fkey` (`endpointCreatedByProfile`),
  KEY `Endpoint_endpointUpdatedByProfile_fkey` (`endpointUpdatedByProfile`),
  CONSTRAINT `Endpoint_endpointCreatedByProfile_fkey` FOREIGN KEY (`endpointCreatedByProfile`) REFERENCES `Profile` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Endpoint_endpointUpdatedByProfile_fkey` FOREIGN KEY (`endpointUpdatedByProfile`) REFERENCES `Profile` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Endpoint` (`path`, `method`, `hidden`, `locked`, `id`, `createdOn`, `updatedOn`, `endpointUpdatedByProfile`, `endpointCreatedByProfile`) VALUES
('/Students/patch',	'PATCH',	1,	0,	'01561430-d623-46e2-8950-6138c12a10ee',	'2023-08-01 18:23:13.652',	'2023-08-07 15:43:54.186',	'BobbyTables',	'BobbyTables'),
('/Location/getIllinois',	'GET',	1,	1,	'03da45cc-fac2-481c-a6ae-f9f1ca7ff916',	'2023-08-08 15:24:31.949',	'2023-08-08 15:24:31.949',	'BobbyTables',	'BobbyTables'),
('/Students/post',	'POST',	1,	0,	'0b6f8a7f-f0f8-4a58-a883-68640e6a45d5',	'2023-08-01 18:38:02.005',	'2023-08-07 15:43:59.680',	'BobbyTables',	'BobbyTables'),
('/Students/put',	'PUT',	1,	0,	'103eac0c-9a76-4d24-8a8f-9261503580aa',	'2023-08-01 18:23:09.140',	'2023-08-07 15:44:02.266',	'BobbyTables',	'BobbyTables'),
('/Students/drop',	'DELETE',	1,	0,	'22c5ac2e-af14-4e65-88c6-2e14c04e67ed',	'2023-08-01 18:23:17.410',	'2023-08-15 15:01:42.626',	'BobbyTables',	'BobbyTables'),
('/Locations/patch',	'PATCH',	1,	1,	'3052cad3-f6f4-4d6c-bbb8-7623882d5246',	'2023-08-08 17:02:40.088',	'2023-08-08 17:02:40.088',	'BobbyTables',	'BobbyTables'),
('/Students/delete',	'DELETE',	1,	0,	'3b025e11-5211-483a-8590-4766bd8bc03a',	'2023-08-01 18:22:54.486',	'2023-08-07 15:44:06.543',	'BobbyTables',	'BobbyTables'),
('/Settings/get',	'GET',	1,	0,	'5b3b9b04-60e7-403b-9cbd-fc7fc72268ae',	'2023-08-15 15:46:27.466',	'2023-08-15 15:46:50.679',	'BobbyTables',	'BobbyTables'),
('/Settings/patch',	'PATCH',	1,	0,	'5eebc116-e3fe-47c8-8462-ee2d1e27b6a3',	'2023-08-15 15:46:38.122',	'2023-08-15 15:46:58.063',	'BobbyTables',	'BobbyTables'),
('/Students/get',	'GET',	1,	0,	'6b4139ee-01da-45d3-a718-85be7239f85b',	'2023-08-02 21:49:58.155',	'2023-08-08 14:22:28.964',	'BobbyTables',	'BobbyTables'),
('/Location/put',	'PUT',	1,	1,	'a7d7a83c-47fa-495a-90a6-569328847fee',	'2023-08-15 15:53:11.303',	'2023-08-15 15:53:11.303',	'BobbyTables',	'BobbyTables'),
('/Location/post',	'POST',	1,	1,	'ebd5ea8a-29bc-4811-8398-7aa296ba1fe1',	'2023-08-15 15:53:18.157',	'2023-08-15 15:53:18.157',	'BobbyTables',	'BobbyTables'),
('/Locations/delete',	'DELETE',	1,	1,	'fb7a4bac-8f61-4a29-9910-6dfa6df88fcf',	'2023-08-08 17:02:26.254',	'2023-08-08 17:02:26.254',	'BobbyTables',	'BobbyTables');

DROP TABLE IF EXISTS `Filter`;
CREATE TABLE `Filter` (
  `type` enum('INDEX','FIELD') COLLATE utf8mb4_unicode_ci NOT NULL,
  `field` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentSource` enum('PROXY','MODEL_DATA','PAYLOAD','INJECT','STATUS_CODE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `behaviorTriggerAction` enum('RESPOND','INSERT_DB','MUTATE_DB') COLLATE utf8mb4_unicode_ci NOT NULL,
  `behaviorSelectorAction` enum('RESPOND','INSERT_DB','MUTATE_DB') COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `Filter_type_value_key` (`type`,`value`),
  KEY `Filter_contentSource_fkey` (`contentSource`),
  KEY `Filter_behaviorTriggerAction_fkey` (`behaviorTriggerAction`),
  KEY `Filter_behaviorSelectorAction_fkey` (`behaviorSelectorAction`),
  CONSTRAINT `Filter_behaviorSelectorAction_fkey` FOREIGN KEY (`behaviorSelectorAction`) REFERENCES `Behavior` (`action`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Filter_behaviorTriggerAction_fkey` FOREIGN KEY (`behaviorTriggerAction`) REFERENCES `Behavior` (`action`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Filter_contentSource_fkey` FOREIGN KEY (`contentSource`) REFERENCES `Content` (`source`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Model`;
CREATE TABLE `Model` (
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdOn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedOn` datetime(3) NOT NULL,
  `profileCreatedByUsername` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileUpdatedByUsername` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Model_profileCreatedByUsername_fkey` (`profileCreatedByUsername`),
  KEY `Model_profileUpdatedByUsername_fkey` (`profileUpdatedByUsername`),
  CONSTRAINT `Model_profileCreatedByUsername_fkey` FOREIGN KEY (`profileCreatedByUsername`) REFERENCES `Profile` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Model_profileUpdatedByUsername_fkey` FOREIGN KEY (`profileUpdatedByUsername`) REFERENCES `Profile` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Model` (`label`, `type`, `data`, `id`, `createdOn`, `updatedOn`, `profileCreatedByUsername`, `profileUpdatedByUsername`) VALUES
('Bypass',	'#BAAAAD',	'{\n  id: \'string?\',\n  createdOn: \'number?\',\n  createdBy: \'string?\',\n  updatedOn: \'number?\',\n  updatedBy: \'string?\',\n  versionId: \'string?\',\n  endsOn: \'number?\',\n  endedOn: \'number?\',\n}',	'01586e5f-3604-496f-b4a3-54daa951fb02',	'2023-08-04 20:11:18.333',	'2023-08-15 16:49:42.949',	'BobbyTables',	'BobbyTables'),
('PostalAddress',	'#25A12E',	'',	'023f813e-a0b8-4bbc-bda4-928735a88d2c',	'2023-07-25 16:59:09.676',	'2023-07-31 20:36:02.581',	'BobbyTables',	'BobbyTables'),
('Test',	'#27D5A8',	'',	'1c00d96e-3833-44ca-86a6-dcef2fc50d7f',	'2023-08-01 14:17:26.333',	'2023-08-07 16:31:54.776',	'BobbyTables',	'BobbyTables'),
('Organization',	'#298BB5',	'',	'2daa37d9-6e7c-439b-ae7e-4b4a3ada5735',	'2023-07-25 16:40:49.426',	'2023-07-25 16:40:49.426',	'BobbyTables',	'BobbyTables'),
('MyAccountUser',	'#298BB5',	'',	'383018cf-c782-4672-ae35-27a3b031864f',	'2023-07-25 16:41:52.990',	'2023-07-25 16:41:52.990',	'BobbyTables',	'BobbyTables'),
('Location',	'#2C8FA2',	'Sample data',	'7fc7ed65-9fee-4cbe-9a74-54d01b67ccdc',	'2023-07-25 16:58:31.762',	'2023-08-02 18:33:47.593',	'BobbyTables',	'BobbyTables'),
('Students',	'#C42A31',	'Robert\'); DROP TABLE Students;--',	'8cbbad99-8fee-46c5-9a5e-d4c83d64a431',	'2023-07-25 16:43:03.757',	'2023-07-31 20:36:08.944',	'BobbyTables',	'BobbyTables'),
('Service',	'#123456',	'',	'9bf34c31-6ceb-48d3-a4d0-2dd6ed5960db',	'2023-08-01 21:28:26.980',	'2023-08-15 16:49:34.502',	'BobbyTables',	'BobbyTables'),
('Users',	'#168A3F',	'asdf',	'b33d847b-5c14-459f-9cc2-47e6590e6725',	'2023-08-04 19:07:44.800',	'2023-08-15 15:16:54.736',	'BobbyTables',	'BobbyTables'),
('Accounts',	'#E43AC2',	'',	'b696e44d-1bca-44b1-8837-05b26695ab05',	'2023-08-02 18:49:38.172',	'2023-08-15 15:17:34.557',	'BobbyTables',	'BobbyTables'),
('Settings',	'#2A95E4',	'',	'd1c1f53e-c011-44bf-b25c-996a738e52dc',	'2023-08-02 18:49:51.074',	'2023-08-15 15:18:59.308',	'BobbyTables',	'BobbyTables'),
('Accounts2',	'#A723CE',	'',	'efebb0ab-021b-4d62-bfe9-2ccd451d3e43',	'2023-08-01 21:28:45.690',	'2023-08-15 15:41:20.627',	'BobbyTables',	'BobbyTables'),
('Users2',	'#F38ED2',	'',	'f0e429c9-1ecb-42cd-a8e5-bc0a48b01111',	'2023-08-02 18:49:43.957',	'2023-08-15 15:38:19.616',	'BobbyTables',	'BobbyTables');

DROP TABLE IF EXISTS `ModelDataConfig`;
CREATE TABLE `ModelDataConfig` (
  `modelLabel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`modelLabel`),
  CONSTRAINT `ModelDataConfig_modelLabel_fkey` FOREIGN KEY (`modelLabel`) REFERENCES `Model` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Profile` (`email`, `password`, `username`) VALUES
('bobby@tables.io',	'password',	'BobbyTables');

DROP TABLE IF EXISTS `Proxy`;
CREATE TABLE `Proxy` (
  `baseURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`baseURL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `ProxyConfig`;
CREATE TABLE `ProxyConfig` (
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proxyBaseURL` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`proxyBaseURL`),
  CONSTRAINT `ProxyConfig_proxyBaseURL_fkey` FOREIGN KEY (`proxyBaseURL`) REFERENCES `Proxy` (`baseURL`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `StatusConfig`;
CREATE TABLE `StatusConfig` (
  `status` int NOT NULL,
  PRIMARY KEY (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('21dbfbf4-de78-4842-beab-11a184687d52',	'7c836245a3cfba559918674062b4165c8ce536465695e740c74f352782dfe2a6',	'2023-07-25 16:32:24.626',	'20230612205211_init',	NULL,	NULL,	'2023-07-25 16:32:24.556',	1),
('e706797e-2479-434f-9d84-a2767e8f13f0',	'ca4c59f9d34f9e56dc538ba5573d437cb9b819f46b9d365a4c672952a1f29999',	'2023-07-25 16:32:25.160',	'20230725163224_',	NULL,	NULL,	'2023-07-25 16:32:24.867',	1);

-- 2023-08-24 18:33:46
