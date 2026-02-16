-- MySQL dump 10.13  Distrib 9.6.0, for macos26.2 (arm64)
--
-- Host: localhost    Database: farmer_platform
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3082b120-0817-11f1-9578-560413505bd8:1-53';

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `total_price` double NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `retailer_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkp5k52qtiygd8jkag4hayd0qg` (`product_id`),
  KEY `FKgwg9a1tjvj29xe4y5mwpn0mpu` (`retailer_id`),
  CONSTRAINT `FKgwg9a1tjvj29xe4y5mwpn0mpu` FOREIGN KEY (`retailer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKkp5k52qtiygd8jkag4hayd0qg` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,100,2,10,NULL),(2,1,100,1,10,NULL),(3,1,100,2,12,NULL),(4,1,100,1,12,NULL),(5,1,100,4,12,'PENDING'),(6,1,100,2,12,'PENDING'),(7,1,123,3,12,'PENDING'),(8,1,100,4,12,'PENDING'),(9,1,100,4,12,'PENDING'),(10,1,100,4,13,'PENDING'),(11,1,123,3,13,'PENDING');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` double NOT NULL,
  `farmer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5h989t4hnwf8stiynt4cxnhd9` (`farmer_id`),
  CONSTRAINT `FK5h989t4hnwf8stiynt4cxnhd9` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `farmer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrh8ldn7kusub8s0oraf2dh4sj` (`farmer_id`),
  CONSTRAINT `FKrh8ldn7kusub8s0oraf2dh4sj` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Demo Product',100,48,9),(2,'Demo Product',100,47,9),(3,'Rice',123,418,11),(4,'Wheat',100,496,11),(5,'Corn',1500,100,11);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('FARMER','RETAILER') DEFAULT NULL,
  `farm_name` varchar(255) DEFAULT NULL,
  `is_approved` bit(1) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `shop_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'pranav@gmail.com','Pranav','$2a$10$nN1CumQBJIZMi04JwUnOyeG5yeP9dqFzVAIbco6p3CNTJx7EWYSqm','FARMER',NULL,_binary '\0',NULL,NULL,NULL),(2,'pranav1@gmail.com','Pranav','$2a$10$O9avLtuZzoOkTEh0HQNudOdH.BfDtPpaOZ3h9dE3xKbE2DtQHy0W2','RETAILER',NULL,_binary '\0',NULL,NULL,NULL),(3,'pranav2@gmail.com','Pranav','$2a$10$jMwQFL4YeRbe7FWubRseHOuvT61XeGkgvyW0jtpBPZ3iuGcoHKlN2','RETAILER',NULL,_binary '\0',NULL,NULL,NULL),(4,'pr@gmail.com','Pranav','$2a$10$Imrch51EgsEGwMv2ZkII2.4u3Hnh1BLZrzNAUA.facnFlfy9QZ8vK','RETAILER',NULL,_binary '\0',NULL,NULL,NULL),(5,'pra@gmail.com','Pra','$2a$10$DHoMtuU8/SxMZULbw2KrWu6E3Uab6CibtegVwyqbzf4YgfBlubEtu','FARMER','',_binary '\0','paca','1234567890',''),(6,'asp@gmail.com','Prana','$2a$10$fYenISofNHZ73bdTvjX1ueacGOOXc6PQaYvKtJPd5uG9xQKqtWvua','FARMER','',_binary '\0','opadf','1234567890',''),(7,'pr123@gmail.com','Pranav ','$2a$10$qJuBpJwcXSTh3r4sSKbDUePLJ3PSDdiIE791d0kzmtAGwnmujoKJq','FARMER','',_binary '\0','qwerty','1234567890',''),(8,'plmko@gmail.com','pranav','$2a$10$e/2l.XLj0Mn3AjAO7JtqD..6XhHKh3.2tEUVViQKn9Z.3iCydI.cy','RETAILER','',_binary '','plmk','1234567890',''),(9,'plm@gmail.com','Prana','$2a$10$4QSL.DNTE5.eafHfGXp53eTtizEf.hDdP.mAMtFp52J2iUi0.hV/e','FARMER','',_binary '\0','asdf','1234567890',''),(10,'pl09@gmail.com','Pranav','$2a$10$S59XxejOyCxQGiQ.eoMKauC0KYrrkVanqAfV9MeODvu7uCOeOtsAK','RETAILER','',_binary '\0','chennai','1234567890',''),(11,'farmer@gmail.com','Dharshini','$2a$10$yN/.C.gNMXLOmmHeHbs0jOyA2RSw0W6CdiGcgfDBqVpMd9YAY.Y2q','FARMER','',_binary '\0','chennai','1234567890',''),(12,'retailer@gmail.com','Dharshini','$2a$10$2kmBh/kxuH7Uqt3N3DhW5em1EXlamOeIXx2JbxPWQGVCjGGRLsK/q','RETAILER','',_binary '\0','chennai','1234567890',''),(13,'retailer1@gmail.com','ABC','$2a$10$QxYX1byWnTV/Q46NlUaP3uyPkg5.OXG1F/sV83/GthrWn6TiFl1aO','RETAILER','',_binary '\0','Chennai','9238150394','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-16 18:30:05
