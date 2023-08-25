-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Behavior`;
CREATE TABLE `Behavior` (
  `action` enum('RESPOND','INSERT_DB','MUTATE_DB') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Content`;
CREATE TABLE `Content` (
  `proxyId` char(36) NOT NULL DEFAULT (uuid()),
  `source` enum('PROXY','MODEL_DATA','PAYLOAD','INJECT','STATUS_CODE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `DataFilter`;
CREATE TABLE `DataFilter` (
  `type` enum('INDEX','FIELD') NOT NULL,
  `field` varchar(255) DEFAULT NULL,
  `value` varchar(255) NOT NULL,
  UNIQUE KEY `datafilter_type_value_unique` (`type`,`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Endpoint`;
CREATE TABLE `Endpoint` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `path` varchar(255) NOT NULL,
  `method` enum('GET','POST','PUT','PATCH','OPTIONS','DELETE') NOT NULL,
  `hidden` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Endpoint` (`id`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`, `path`, `method`, `hidden`, `locked`) VALUES
('24620621-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:41:25',	'2023-08-25 21:41:25',	'/Students/post',	'POST',	0,	0),
('27d78b5b-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:41:31',	'2023-08-25 21:41:31',	'/Students/patch',	'PATCH',	0,	0),
('2b93f9dd-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:41:38',	'2023-08-25 21:41:38',	'/Students/delete',	'DELETE',	0,	0),
('302e82fb-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:41:45',	'2023-08-25 21:41:45',	'/Students/options',	'OPTIONS',	0,	0),
('36942f0d-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:41:56',	'2023-08-25 21:41:56',	'/Students/get',	'GET',	0,	0),
('3c01cb6d-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:42:05',	'2023-08-25 21:42:05',	'/Students/put',	'PUT',	0,	0);

DROP TABLE IF EXISTS `Model`;
CREATE TABLE `Model` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `createdBy` varchar(255) NOT NULL,
  `updatedBy` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `label` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL,
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Model` (`id`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`, `label`, `type`, `data`) VALUES
('0732051c-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:40:37',	'2023-08-25 21:40:37',	'Location',	'#8139CD',	''),
('79ad76b1-438f-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:36:39',	'2023-08-25 21:36:39',	'MyAccountUser',	'#3AE6D0',	''),
('6cdd39c7-438f-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:36:18',	'2023-08-25 21:36:18',	'Organization',	'#298BB5',	''),
('144ee39b-4390-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 21:40:59',	'2023-08-25 21:40:59',	'PostalAddress',	'#5CA592',	''),
('6f5f9041-4368-11ee-ae43-0242ac1a0003',	'BobbyTables',	'BobbyTables',	'2023-08-25 16:57:11',	'2023-08-25 16:57:11',	'Students',	'#CE2813',	'');

DROP TABLE IF EXISTS `ModelDataConfig`;
CREATE TABLE `ModelDataConfig` (
  `modelId` char(36) NOT NULL DEFAULT (uuid())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Profile` (`username`, `password`, `email`) VALUES
('BobbyTables',	'password',	'bobby@tables.io');

DROP TABLE IF EXISTS `Proxy`;
CREATE TABLE `Proxy` (
  `baseUrl` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `ProxyConfig`;
CREATE TABLE `ProxyConfig` (
  `proxyId` char(36) NOT NULL DEFAULT (uuid()),
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `RequestFilter`;
CREATE TABLE `RequestFilter` (
  `type` enum('HEADER','BODY','PATH','USER','DATE','STRING','QUERY','USAGE') NOT NULL,
  `field` varchar(255) DEFAULT NULL,
  `value` varchar(255) NOT NULL,
  UNIQUE KEY `requestfilter_type_value_unique` (`type`,`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `StatusConfig`;
CREATE TABLE `StatusConfig` (
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('21dbfbf4-de78-4842-beab-11a184687d52',	'7c836245a3cfba559918674062b4165c8ce536465695e740c74f352782dfe2a6',	'2023-07-25 16:32:24.626',	'20230612205211_init',	NULL,	NULL,	'2023-07-25 16:32:24.556',	1),
('e706797e-2479-434f-9d84-a2767e8f13f0',	'ca4c59f9d34f9e56dc538ba5573d437cb9b819f46b9d365a4c672952a1f29999',	'2023-07-25 16:32:25.160',	'20230725163224_',	NULL,	NULL,	'2023-07-25 16:32:24.867',	1);

-- 2023-08-25 21:44:28
