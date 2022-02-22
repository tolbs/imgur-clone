-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbpath` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'hello','final','public/images/uploads/1602d20b85d84fcd003917bff85d9f988f4c615ad9ab.jpeg','public/images/uploads/thumbnail-1602d20b85d84fcd003917bff85d9f988f4c615ad9ab.jpeg',0,'2021-05-19 15:29:43',3),(2,'My Profile Picture','Jaelyn drew this for me!','public/images/uploads/2ca44e394f0bf5e6f3bd4be1b1b2cd1bfeaa1bd7c6e9.jpeg','public/images/uploads/thumbnail-2ca44e394f0bf5e6f3bd4be1b1b2cd1bfeaa1bd7c6e9.jpeg',0,'2021-05-19 15:31:12',3),(3,'Akashi','Cool guy from Kuroko\'s Basketball','public/images/uploads/82b0bf4492327d82386f7bb5404ea48a7d5c573199c7.jpeg','public/images/uploads/thumbnail-82b0bf4492327d82386f7bb5404ea48a7d5c573199c7.jpeg',0,'2021-05-19 17:20:53',3),(4,'Shun','Another cool guy from anime','public/images/uploads/b1257d508cbacc01dd7b8c7f88047b7bcce35d74cf84.jpeg','public/images/uploads/thumbnail-b1257d508cbacc01dd7b8c7f88047b7bcce35d74cf84.jpeg',0,'2021-05-19 17:21:19',3),(5,'Lass','My main in Grand Chase','public/images/uploads/067991f7c222a1a06ba8de18d64b37b6f73df224ace8.png','public/images/uploads/thumbnail-067991f7c222a1a06ba8de18d64b37b6f73df224ace8.png',0,'2021-05-19 17:21:49',3),(6,'Yato','From a really good anime','public/images/uploads/3e49ad81ff1a37951e1913e18d4b934b25a04bd83d19.png','public/images/uploads/thumbnail-3e49ad81ff1a37951e1913e18d4b934b25a04bd83d19.png',0,'2021-05-19 17:22:12',3),(7,'Pixel Town','A cool wallpaper I found','public/images/uploads/33a09e9424861c6fcd922502fc931592f8a94dca016b.jpeg','public/images/uploads/thumbnail-33a09e9424861c6fcd922502fc931592f8a94dca016b.jpeg',0,'2021-05-19 17:22:45',3),(8,'Hikigaya','Hello first post, I relate to this guy.','public/images/uploads/86e34a83fef56f94b121287d9d4f45edc3efe674d3f8.jpeg','public/images/uploads/thumbnail-86e34a83fef56f94b121287d9d4f45edc3efe674d3f8.jpeg',0,'2021-05-19 17:24:10',6),(9,'Kaneki','Tokyo Ghoul is a good anime.','public/images/uploads/1051ad35b4cc877e7baf6e71597caa8c192b97db2255.jpeg','public/images/uploads/thumbnail-1051ad35b4cc877e7baf6e71597caa8c192b97db2255.jpeg',0,'2021-05-19 20:00:08',7);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1','test1@mail.com','$2b$10$gva7lzh0VBFD7hUt0vuHcOIOEOAIGkJcAFkiZbI808yfJnUkGNISm',0,0,'2021-05-18 18:38:36'),(2,'test2','test2@mail.com','$2b$10$qE.Q4GIO/VhIBWOUvG3b0O4NcgMJ8olVfo6FS5n0/KyYaO6mI7AHy',0,0,'2021-05-18 18:48:19'),(3,'test3','test3@mail.com','$2b$15$0BIGYb9YG12eQSBpCB5NsuQQjZEr6zDJlHb8DIZu2CITZtlsANaVa',0,0,'2021-05-18 18:50:06'),(4,'user1','user1@mail.com','$2b$15$yidKV4qNwWJ8iHvYQBKcCOG83EeZ8P6uXj8DDLt8XOmxtTmei3dtG',0,0,'2021-05-18 22:52:09'),(5,'user2','user2@mail.com','$2b$15$DZVuir/pZSzxU/ErB1U33e.JX8GMOM.RnxhhD6I4V6OBQuSAyuFeC',0,0,'2021-05-18 23:04:22'),(6,'superuser','super@user.com','$2b$15$VIVdyOWcL0zFJyq/Kj2kpOfx4HPgcla8rdSHskt4ekbAwF5iZ/GHS',0,0,'2021-05-19 17:23:26'),(7,'player1','player1@mail.com','$2b$15$Hk2c9MmPnT23K23yBT9lyOVUnShKcjznyGI97ydxgwA3qWqTrv4Vu',0,0,'2021-05-19 19:59:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 22:58:22
