-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: fms
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `articleId` int NOT NULL AUTO_INCREMENT,
  `articleName` varchar(100) NOT NULL,
  `brandId` int NOT NULL,
  `shopId` int NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`articleId`),
  KEY `brand_id_fk_idx` (`brandId`),
  CONSTRAINT `brand_id_fk` FOREIGN KEY (`brandId`) REFERENCES `brands` (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'BAI09',2,11,29,29,'2024-09-26 16:49:09','2024-09-26 16:49:09'),(2,'Princess',1,11,29,29,'2024-09-26 16:49:38','2024-09-26 16:49:38'),(3,'BAI19',2,11,29,29,'2024-09-27 16:51:14','2024-09-27 16:51:14'),(4,'SPX-1025',3,11,29,29,'2024-09-27 17:21:20','2024-09-27 17:21:20'),(5,'887',5,11,29,29,'2024-10-02 18:21:49','2024-10-02 18:21:49'),(6,'439',5,11,29,29,'2024-10-02 18:29:16','2024-10-02 18:29:16'),(7,'HW0028G',1,11,29,29,'2024-10-08 16:00:33','2024-10-08 16:00:33');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biill`
--

DROP TABLE IF EXISTS `biill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `biill` (
  `billId` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `categoryName` varchar(45) NOT NULL,
  `articleName` varchar(45) NOT NULL,
  `brandName` varchar(45) NOT NULL,
  `colorName` varchar(45) NOT NULL,
  `size` int NOT NULL,
  `sellingPrice` int NOT NULL,
  `mrp` int NOT NULL,
  `preDiscount` int NOT NULL,
  `offeredDiscount` int NOT NULL,
  `finalPrice` int NOT NULL,
  `sellerId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `status` int NOT NULL,
  `paymentMode` int NOT NULL,
  `isPaid` tinyint NOT NULL,
  `paidAmount` int NOT NULL,
  `remainingAmount` int NOT NULL,
  `parentBillId` int NOT NULL,
  PRIMARY KEY (`billId`),
  UNIQUE KEY `billId_UNIQUE` (`billId`),
  KEY `parentbill_id_fk_idx` (`parentBillId`),
  KEY `status_id_fk_idx` (`status`),
  KEY `paymentType_id_fk_idx` (`paymentMode`),
  KEY `seller_id_Fk_idx` (`sellerId`),
  KEY `updatedby_id_fk_idx` (`updatedBy`),
  KEY `created_by_id_fk_idx` (`createdBy`),
  CONSTRAINT `created_by_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `user` (`userId`),
  CONSTRAINT `parentbill_id_fk` FOREIGN KEY (`parentBillId`) REFERENCES `mainbill` (`mainBillId`),
  CONSTRAINT `paymentType_id_fk` FOREIGN KEY (`paymentMode`) REFERENCES `paymenttypes` (`paymentTypeId`),
  CONSTRAINT `seller_id_Fk` FOREIGN KEY (`sellerId`) REFERENCES `user` (`userId`),
  CONSTRAINT `status_id_fk` FOREIGN KEY (`status`) REFERENCES `billstatus` (`billStatusId`),
  CONSTRAINT `updatedby_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biill`
--

LOCK TABLES `biill` WRITE;
/*!40000 ALTER TABLE `biill` DISABLE KEYS */;
/*!40000 ALTER TABLE `biill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billstatus`
--

DROP TABLE IF EXISTS `billstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billstatus` (
  `billStatusId` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `isActive` tinyint NOT NULL,
  PRIMARY KEY (`billStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billstatus`
--

LOCK TABLES `billstatus` WRITE;
/*!40000 ALTER TABLE `billstatus` DISABLE KEYS */;
INSERT INTO `billstatus` VALUES (1,'Sold',1),(2,'Returned',1);
/*!40000 ALTER TABLE `billstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brandId` int NOT NULL AUTO_INCREMENT,
  `brandName` varchar(100) NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shopId` int NOT NULL,
  PRIMARY KEY (`brandId`),
  UNIQUE KEY `brandId_UNIQUE` (`brandId`),
  UNIQUE KEY `brandName_UNIQUE` (`brandName`),
  KEY `created_by_idx` (`createdBy`),
  KEY `updated_by_idx` (`updatedBy`),
  KEY `shopid_fk_idx` (`shopId`),
  CONSTRAINT `created_by_user` FOREIGN KEY (`createdBy`) REFERENCES `user` (`userId`),
  CONSTRAINT `shopid_fk` FOREIGN KEY (`shopId`) REFERENCES `shops` (`shopId`),
  CONSTRAINT `updated_by_user` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Paragoan',29,29,'2024-09-26 16:47:26','2024-09-26 16:47:26',11),(2,'Bairathi',29,29,'2024-09-26 16:47:56','2024-09-26 16:47:56',11),(3,'Sparx',29,29,'2024-09-27 15:26:13','2024-09-27 15:26:13',11),(4,'Bata',29,29,'2024-09-27 15:41:59','2024-09-27 15:41:59',11),(5,'Madan',29,29,'2024-10-02 18:21:29','2024-10-02 18:21:29',11);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `shopId` int NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `categoryName_UNIQUE` (`categoryName`),
  KEY `created_by_idx` (`createdBy`),
  KEY `updated_by_idx` (`updatedBy`),
  KEY `shopid_fk_idx` (`shopId`),
  CONSTRAINT `category_shopid_fk` FOREIGN KEY (`shopId`) REFERENCES `shops` (`shopId`),
  CONSTRAINT `created_by` FOREIGN KEY (`createdBy`) REFERENCES `user` (`userId`),
  CONSTRAINT `updated_by` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Ladies','2024-09-26 17:42:31','2024-09-26 17:42:31',29,29,11),(5,'Gents','2024-09-27 10:52:38','2024-09-27 10:52:38',29,29,11),(6,'Boys','2024-09-27 13:09:17','2024-09-27 13:09:17',29,29,11),(7,'Girls','2024-09-27 15:17:36','2024-09-27 15:17:36',29,29,11),(8,'Kids','2024-09-27 15:18:18','2024-09-27 15:18:18',29,29,11),(9,'Babies','2024-09-27 15:19:35','2024-09-27 15:19:35',29,29,11),(10,'Farm','2024-10-02 18:22:12','2024-10-02 18:22:12',29,29,11);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `colorId` int NOT NULL AUTO_INCREMENT,
  `colorName` varchar(100) NOT NULL,
  `shopId` int NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `colorCode` varchar(45) NOT NULL,
  PRIMARY KEY (`colorId`),
  UNIQUE KEY `colorId_UNIQUE` (`colorId`),
  KEY `created_by_color_fk_idx` (`createdBy`),
  KEY `updated_by_color_fk_idx` (`updatedBy`),
  CONSTRAINT `created_by_color_fk` FOREIGN KEY (`createdBy`) REFERENCES `user` (`userId`),
  CONSTRAINT `updated_by_color_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Red',11,29,29,'2024-09-26 16:50:57','2024-09-26 16:50:57',''),(2,'Orange',11,29,29,'2024-10-01 20:46:34','2024-10-01 20:46:34','#ffae00'),(3,'Black',11,29,29,'2024-10-01 20:50:01','2024-10-01 20:50:01','#030303'),(4,'Blue',11,29,29,'2024-10-08 16:00:50','2024-10-08 16:00:50','#3874ff');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `mobileNo` char(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `customerId_UNIQUE` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mainbill`
--

DROP TABLE IF EXISTS `mainbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainbill` (
  `mainBillId` int NOT NULL AUTO_INCREMENT,
  `itemQuantity` int NOT NULL,
  `totalAmount` int NOT NULL,
  `paidAmount` int NOT NULL,
  `isPaid` int NOT NULL,
  `billBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customerId` int NOT NULL,
  PRIMARY KEY (`mainBillId`),
  UNIQUE KEY `mainBillId_UNIQUE` (`mainBillId`),
  KEY `customer_id_fk_idx` (`customerId`),
  CONSTRAINT `customer_id_fk` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainbill`
--

LOCK TABLES `mainbill` WRITE;
/*!40000 ALTER TABLE `mainbill` DISABLE KEYS */;
/*!40000 ALTER TABLE `mainbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymenttypes`
--

DROP TABLE IF EXISTS `paymenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymenttypes` (
  `paymentTypeId` int NOT NULL AUTO_INCREMENT,
  `paymentType` varchar(45) NOT NULL,
  `isActive` varchar(45) NOT NULL,
  PRIMARY KEY (`paymentTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttypes`
--

LOCK TABLES `paymenttypes` WRITE;
/*!40000 ALTER TABLE `paymenttypes` DISABLE KEYS */;
INSERT INTO `paymenttypes` VALUES (1,'Credit Card','1'),(2,'Debit Card','1'),(3,'PayPal','1'),(4,'Net Banking','1'),(5,'Cash on Delivery','1'),(6,'UPI','1'),(7,'Wallet','1'),(8,'Bank Transfer','1'),(9,'Cryptocurrency','0');
/*!40000 ALTER TABLE `paymenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(100) CHARACTER SET armscii8 COLLATE armscii8_general_ci NOT NULL,
  `articleId` int NOT NULL,
  `categoryId` int NOT NULL,
  `quantity` int unsigned NOT NULL,
  `mrp` int unsigned NOT NULL,
  `actualPrice` int unsigned NOT NULL,
  `discount` int unsigned NOT NULL DEFAULT '0',
  `size` int unsigned NOT NULL,
  `shopId` int NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `colorId` int NOT NULL,
  `sellingPrice` int NOT NULL,
  PRIMARY KEY (`productId`),
  UNIQUE KEY `productId_UNIQUE` (`productId`),
  KEY `article_id_fk_idx` (`articleId`),
  KEY `color_id_fk_idx` (`colorId`),
  KEY `shop_id_fk_idx` (`shopId`),
  CONSTRAINT `article_id_fk` FOREIGN KEY (`articleId`) REFERENCES `articles` (`articleId`),
  CONSTRAINT `color_id_fk` FOREIGN KEY (`colorId`) REFERENCES `colors` (`colorId`),
  CONSTRAINT `shop_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops` (`shopId`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (101,'Test 8',4,7,2,200,150,5,6,11,29,29,'2024-10-03 12:13:20','2024-10-03 15:04:07',1,190),(103,'Bairathi',1,5,8,522,160,10,6,11,29,29,'2024-10-03 14:59:40','2024-10-03 14:59:40',2,470),(104,'Madan 887',5,10,1,340,210,5,5,11,29,29,'2024-10-08 15:37:16','2024-10-08 15:37:16',3,323),(105,'Madan 887',5,10,2,340,210,5,6,11,29,29,'2024-10-08 15:37:16','2024-10-08 15:37:16',3,323),(106,'Madan 887',5,10,3,340,210,5,7,11,29,29,'2024-10-08 15:37:16','2024-10-08 15:37:16',3,323),(107,'Madan 887',5,10,4,340,210,5,10,11,29,29,'2024-10-08 15:37:16','2024-10-08 15:37:16',3,323),(108,'Madan 887',5,10,4,340,210,5,8,11,29,29,'2024-10-08 15:37:16','2024-10-08 15:37:16',3,323),(109,'Paragoan Princess',2,1,1,140,105,0,6,11,29,29,'2024-10-08 15:38:14','2024-10-08 15:38:14',3,140),(110,'Paragoan Princess',2,1,1,140,105,0,5,11,29,29,'2024-10-08 15:38:14','2024-10-08 15:38:14',3,140),(111,'Paragoan Princess',2,1,1,140,105,0,7,11,29,29,'2024-10-08 15:38:14','2024-10-08 15:38:14',3,140),(112,'Paragon',2,1,1,140,105,0,8,11,29,29,'2024-10-08 15:39:56','2024-10-08 15:39:56',3,140),(113,'Paragoan Slipper',7,5,3,150,110,0,5,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150),(114,'Paragoan Slipper',7,5,5,150,110,0,10,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150),(115,'Paragoan Slipper',7,5,1,150,110,0,8,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150),(116,'Paragoan Slipper',7,5,1,150,110,0,6,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150),(117,'Paragoan Slipper',7,5,1,150,110,0,9,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150),(118,'Paragoan Slipper',7,5,1,150,110,0,4,11,29,29,'2024-10-08 16:02:01','2024-10-08 17:27:23',4,150);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) NOT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleId_UNIQUE` (`roleId`),
  UNIQUE KEY `roleName_UNIQUE` (`roleName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'Admin'),(3,'Sells Man'),(1,'Super Admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shops`
--

DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shops` (
  `shopName` varchar(25) NOT NULL,
  `shopId` int NOT NULL AUTO_INCREMENT,
  `shopUserName` varchar(25) NOT NULL,
  `state` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `tahsil` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `landMark` varchar(250) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` int NOT NULL DEFAULT '0',
  `createdBy` int NOT NULL DEFAULT '0',
  `village` varchar(45) NOT NULL,
  PRIMARY KEY (`shopId`),
  UNIQUE KEY `userName_UNIQUE` (`shopUserName`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shops`
--

LOCK TABLES `shops` WRITE;
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` VALUES ('vinod footweare',10,'vinodFootweare','Maharashtra','Kolhapur','Hatkanagle','Wathar','Near st stand',1,0,'2024-09-10 10:18:48','2024-09-22 17:30:42',0,0,'Ghunki'),('Maruti Foot wear',11,'MarutiFootWear','Maharashtra','Kolhapur','Hatkanangle','Wathar','Near St Stand Ghunki.',1,0,'2024-09-18 11:28:25','2024-09-21 20:37:08',0,0,'Ghunki');
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `shopId` int NOT NULL,
  `mobileNo` bigint NOT NULL,
  `email` varchar(100) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `createdBy` int NOT NULL DEFAULT '0',
  `updatedBy` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roleId` int DEFAULT '2',
  `isActive` tinyint NOT NULL DEFAULT '0',
  `password` varchar(255) DEFAULT NULL,
  `activationToken` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `activationToken_UNIQUE` (`activationToken`),
  KEY `shopid_idx` (`shopId`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `roleId` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`),
  CONSTRAINT `shopid` FOREIGN KEY (`shopId`) REFERENCES `shops` (`shopId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (28,'yash','doifode',10,8080494027,'yash@gmail.com','yash_doifode',1,1,'2024-09-12 17:24:36','2024-09-12 17:24:36',1,1,'$2a$10$29nMdosmqK6wB6qzsWrzTOPOlAPY9V3ieu.dL6cbyGGoDrOTJVUiy',NULL),(29,'John2','Doe2',11,9876543210,'om@gmail.com','om_doifode',1,1,'2024-09-17 20:20:18','2024-09-23 18:14:24',2,1,'$2a$10$xrLnt.B60cvH25w4pBgobeWUD946Zo7mYr1w/kUXjKsarNqjC9AOG',NULL),(31,'Rushi','Sid2',10,8745635241,'rushi@gmail.com','Rushi',28,28,'2024-09-22 17:43:48','2024-09-23 21:25:00',2,0,NULL,'1f824995-78dc-11ef-8993-18dbf240cf51'),(32,'Rohit','Mane',10,658754216598,'rohit@gmail.com','rohit',28,28,'2024-09-22 17:45:33','2024-09-23 21:32:03',2,0,NULL,'5dad8cf4-78dc-11ef-8993-18dbf240cf51'),(33,'Akash1','Sid',10,8745968574,'akash@gmail.com','akash_sid',28,28,'2024-09-23 21:47:17','2024-09-23 21:47:27',3,0,NULL,'4d5d33e8-79c7-11ef-8993-18dbf240cf51'),(34,'Rushikesh','Sid ',11,8774859674,'rush2i@gmail.com','rushi_sid',29,29,'2024-09-24 22:05:23','2024-10-09 17:28:35',3,1,'$2a$10$eCxWtT5s97dEhkNIh/t52uxrZUXhcQeN/e9r96o0wY7elXhgyIFwm',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'fms'
--
/*!50003 DROP PROCEDURE IF EXISTS `ACTIVATE_SHOP_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ACTIVATE_SHOP_BY_ID`(
    IN SHOP_ID INT 
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1 MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Rollback the transaction in case of an error
        ROLLBACK;

        -- Re-throw the error with the original message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    START TRANSACTION;

    -- Check if the SHOPID exists in the shops table
    IF NOT EXISTS (SELECT 1 FROM shops WHERE shopId = SHOP_ID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP ID DOES NOT EXIST.';
        -- Update the existing shop details 
		ELSEIF  EXISTS (SELECT 1 FROM SHOPS WHERE shopId = SHOP_ID AND isActive = 1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP IS ACTIVE CANT RESTORE IT';
			ELSE
        UPDATE shops  SET isActive = 1 , updatedAt = current_time() WHERE shopId = SHOP_ID  AND isActive =0;
        -- Check if the update was successful
        IF ROW_COUNT() = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'RESTORE SHOP FAILED. SHOP ID NOT FOUND OR NO CHANGES MADE.';
        END IF;
    END IF;

    COMMIT;

    -- Return the updated shop details
    SELECT * FROM shops WHERE shopId = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DELETE_PRODUCT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DELETE_PRODUCT`(IN PRODUCT_ID INT ,IN SHOP_ID INT)
BEGIN

IF(SELECT COUNT(*)FROM SHOPS WHERE SHOPID = SHOP_ID)=0 THEN 
SIGNAL SQLSTATE '45000'SET MESSAGE_TEXT="Shop not found.";
END IF;

IF(SELECT COUNT(*)FROM PRODUCTS WHERE SHOPID = SHOP_ID AND PRODUCTID = PRODUCT_ID)=0 THEN 
SIGNAL SQLSTATE '45000'SET MESSAGE_TEXT="Product not found.";
END IF;

DELETE FROM PRODUCTS WHERE SHOPID = SHOP_ID AND PRODUCTID = PRODUCT_ID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DISABLE_SHOP_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DISABLE_SHOP_BY_ID`(
    IN SHOP_ID INT 
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1 MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Rollback the transaction in case of an error
        ROLLBACK;

        -- Re-throw the error with the original message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    START TRANSACTION;

    -- Check if the SHOPID exists in the shops table
    IF NOT EXISTS (SELECT 1 FROM shops WHERE shopId = SHOP_ID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP ID DOES NOT EXIST.';
        -- Update the existing shop details
        ELSEIF EXISTS (SELECT 1 FROM SHOPS WHERE shopId = SHOP_ID AND isDeleted = 1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP IS DELETED';
		ELSEIF  EXISTS (SELECT 1 FROM SHOPS WHERE shopId = SHOP_ID AND isActive = 0) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP IS ALREADY DISABLED';
			ELSE
        UPDATE shops  SET isActive = 0 , updatedAt = current_time() WHERE shopId = SHOP_ID AND isDeleted = 0;
        -- Check if the update was successful
        IF ROW_COUNT() = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'DISABLE FAILED. SHOP ID NOT FOUND OR NO CHANGES MADE.';
        END IF;
    END IF;

    COMMIT;

    -- Return the updated shop details
    SELECT * FROM shops WHERE shopId = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_ARTICLES` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_ARTICLES`(IN SHOP_ID INT)
BEGIN
IF (SELECT COUNT(*)FROM ARTICLES WHERE SHOPID = SHOP_ID)=0 THEN 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Shop does not exists';
END IF; 
SELECT ARTICLES.* , brandName FROM ARTICLES JOIN BRANDS ON ARTICLES.BRANDID = BRANDS.BRANDID WHERE ARTICLES.SHOPID = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_BRANDS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_BRANDS`(IN SHOP_ID INT)
BEGIN
IF (SELECT COUNT(*)FROM BRANDS WHERE SHOPID = SHOP_ID)=0 THEN 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Shop does not exists';
END IF; 
SELECT * FROM BRANDS WHERE SHOPID = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_CATEGORIES` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_CATEGORIES`(IN SHOP_ID INT)
BEGIN
IF (SELECT COUNT(*)FROM SHOPS WHERE SHOPID = SHOP_ID)=0 THEN 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Shop does not exists';
END IF; 
SELECT * FROM CATEGORY WHERE SHOPID = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_COLORS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_COLORS`(IN SHOP_ID INT)
BEGIN
IF (SELECT COUNT(*)FROM COLORS WHERE SHOPID = SHOP_ID)=0 THEN 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Shop does not exists';
END IF; 
SELECT *  FROM  COLORS  WHERE SHOPID = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ALL_PRODUCTS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ALL_PRODUCTS`(IN SHOP_ID INT)
BEGIN
    -- Check if the shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Shop not found.';
    ELSE
        -- If the shop exists, retrieve the products
        SELECT 
            PR.*,
            BR.brandName,
            CT.categoryName,
            AR.articleName,
            CO.colorName
        FROM 
            PRODUCTS PR
        JOIN 
            CATEGORY CT ON PR.CATEGORYID = CT.CATEGORYID
        JOIN 
            ARTICLES AR ON PR.ARTICLEID = AR.ARTICLEID
        JOIN 
            BRANDS BR ON AR.BRANDID = BR.BRANDID
        JOIN 
            COLORS CO ON PR.COLORID = CO.COLORID
        WHERE 
            PR.SHOPID = SHOP_ID LIMIT 50;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PRODUCTS_BY_ARTICLE_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PRODUCTS_BY_ARTICLE_ID`(IN SHOP_ID INT, IN ARTICLE_ID INT)
BEGIN
    -- Check if the shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Shop not found.';
    ELSE
        -- If the shop exists, retrieve the products
        SELECT 
            PR.*,
            BR.brandName,
            CT.categoryName,
            AR.articleName,
            CO.colorName
        FROM 
            PRODUCTS PR
        JOIN 
            CATEGORY CT ON PR.CATEGORYID = CT.CATEGORYID
        JOIN 
            ARTICLES AR ON PR.ARTICLEID = AR.ARTICLEID
        JOIN 
            BRANDS BR ON AR.BRANDID = BR.BRANDID
        JOIN 
            COLORS CO ON PR.COLORID = CO.COLORID
        WHERE 
            PR.SHOPID = SHOP_ID AND PR.ARTICLEID = ARTICLE_ID LIMIT 50;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PRODUCTS_BY_CATEGORY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PRODUCTS_BY_CATEGORY_ID`(IN SHOP_ID INT, IN CATEGORY_ID INT)
BEGIN
    -- Check if the shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Shop not found.';
    ELSE
        -- If the shop exists, retrieve the products
        SELECT 
            PR.*,
            BR.brandName,
            CT.categoryName,
            AR.articleName,
            CO.colorName
        FROM 
            PRODUCTS PR
        JOIN 
            CATEGORY CT ON PR.CATEGORYID = CT.CATEGORYID
        JOIN 
            ARTICLES AR ON PR.ARTICLEID = AR.ARTICLEID
        JOIN 
            BRANDS BR ON AR.BRANDID = BR.BRANDID
        JOIN 
            COLORS CO ON PR.COLORID = CO.COLORID
        WHERE 
            PR.SHOPID = SHOP_ID AND PR.CATEGORYID = CATEGORY_ID LIMIT 50;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PRODUCT_SIZE_AND_QUANTITY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PRODUCT_SIZE_AND_QUANTITY`(IN PRODUCT_NAME VARCHAR(100), IN CATEGORY_ID INT,IN ARTCILE_ID INT ,IN COLOR_ID INT, IN SHOP_ID INT)
BEGIN
IF(SELECT COUNT(*)
 from products where 
 productName= PRODUCT_NAME AND categoryId=CATEGORY_ID AND articleId=ARTCILE_ID AND colorId=COLOR_ID and shopId =SHOP_ID) =0 THEN
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Product not found.';
 end if;

SELECT size , quantity,productId
 from products where 
 productName= PRODUCT_NAME AND categoryId=CATEGORY_ID AND articleId=ARTCILE_ID AND colorId=COLOR_ID and shopId =SHOP_ID ; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PRODUCT_TO_BILL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PRODUCT_TO_BILL`(IN ARTICLE_ID INT,IN COLOR_ID INT,IN SIZE_VAL INT, IN SHOP_ID INT )
BEGIN

  IF (SELECT COUNT(*) FROM COLORS WHERE COLORID = COLOR_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Color is not present.';
        END IF;
        
IF (SELECT COUNT(*) FROM ARTICLES WHERE ARTICLEID = ARTICLE_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Article is not present.';
        END IF;
        
IF (SELECT COUNT(*) FROM PRODUCTS WHERE SIZE = SIZE_VAL) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Size is not present.';
        END IF;
-- If the shop exists, retrieve the products
        SELECT 
            PR.*,
            BR.brandName,
            CT.categoryName,
            AR.articleName,
            CO.colorName
        FROM 
            PRODUCTS PR
        JOIN 
            CATEGORY CT ON PR.CATEGORYID = CT.CATEGORYID
        JOIN 
            ARTICLES AR ON PR.ARTICLEID = AR.ARTICLEID
        JOIN 
            BRANDS BR ON AR.BRANDID = BR.BRANDID
        JOIN 
            COLORS CO ON PR.COLORID = CO.COLORID
        WHERE 
            PR.SHOPID = SHOP_ID AND PR.ARTICLEID =ARTICLE_ID AND PR.COLORID = COLOR_ID AND PR.SIZE = SIZE_VAL;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_SHOP_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_SHOP_BY_ID`(IN SHOP_ID INT)
BEGIN
    DECLARE MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);

    -- Error handling block
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1
            MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Use the original MySQL error message in the SIGNAL statement
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    -- Check if the shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN
        -- Set a custom error message
        SET MYSQL_ERROR_MESSAGE = 'No Records Found.';
        -- Signal an error with the custom message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    ELSE
        -- Return the shop details if found
        SELECT * FROM SHOPS WHERE SHOPID = SHOP_ID;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_USERS_BY_SHOP_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USERS_BY_SHOP_ID`(IN SHOP_ID INT,IN USER_ID INT)
BEGIN 
    DECLARE MESSAGE VARCHAR(500) DEFAULT '';

    -- Exit handler for any SQL exception
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Check if the shop exists
        IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN 
            SET MESSAGE = 'Shop not found.';
        ELSE
            SET MESSAGE = 'Error while getting users by shop id.';
        END IF;

        -- Signal the error with the appropriate message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END;

    -- Select users if no exception
    SELECT U.*,roleName FROM USER U LEFT JOIN ROLES R ON R.roleId = U.ROLEID WHERE (U.shopId = SHOP_ID) AND (USER_ID != U.userId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_USER_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USER_BY_ID`(
    IN  USER_ID INT,
    IN SHOP_ID INT
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(5000) DEFAULT "";

    -- Check if the user exists for the given USER_ID and SHOP_ID
    IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID AND SHOPID = SHOP_ID) = 0 THEN
        SET ERROR_MESSAGE = "User not found.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ERROR_MESSAGE;
    END IF;

    -- If the user exists, select the user details
    SELECT * 
    FROM USER 
    WHERE USERID = USER_ID AND SHOPID = SHOP_ID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `IS_AUTHENTICATED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `IS_AUTHENTICATED`(
    IN USER_ID INT,
    IN SHOP_ID INT
)
BEGIN

     IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "User not found.";
     END IF;
     
      IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID AND isActive =1) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "You are not active user in this shop please contact shop owner.";
     END IF;
     
     IF (SELECT COUNT(*) FROM shops WHERE shopId = SHOP_ID) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "Shop not found.";
     END IF;
     
     IF (SELECT COUNT(*) FROM shops WHERE isActive = 1 AND shopId = SHOP_ID) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "Your shop is not active. Please contact the shop owner.";
     END IF;
     
      IF (SELECT COUNT(*) FROM USER WHERE isActive = 1 AND shopId = SHOP_ID AND USERID =USER_ID) = 0 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=   "You don't have permissions.";
     END IF; 
     
     SELECT * FROM USER WHERE SHOPID = SHOP_ID AND USERID = USER_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_ARTICLE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_ARTICLE`( IN ARTICLE_NAME VARCHAR(100), IN BRAND_ID INT, IN CREATED_BY INT,IN  SHOP_ID INT)
BEGIN

IF(SELECT COUNT(*) FROM ARTICLES WHERE ARTICLENAME =ARTICLE_NAME AND SHOPID = SHOP_ID AND BRANDID =BRAND_ID) >0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT="Article already exists.";
END IF;

IF(SELECT COUNT(*) FROM BRANDS WHERE BRANDID =BRAND_ID AND SHOPID = SHOP_ID) =0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT="Brand name not found.";
END IF;

INSERT INTO 
ARTICLES 
(articleName,
brandId,
createdBy,
updatedBy,
shopId) 
VALUES(ARTICLE_NAME,
BRAND_ID,
CREATED_BY,
CREATED_BY,
SHOP_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_BRAND` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_BRAND`( IN BRAND_NAME VARCHAR(100), IN CREATED_BY INT,IN  SHOP_ID INT)
BEGIN

IF(SELECT COUNT(*) FROM BRANDS WHERE brandName = BRAND_NAME AND SHOPID = SHOP_ID) >0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT="Brand Name already exists.";
END IF;

INSERT INTO 
BRANDS 
(brandName,
createdBy,
updatedBy,
shopId) 
VALUES(BRAND_NAME,
CREATED_BY,
CREATED_BY,
SHOP_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_CATEGORY` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_CATEGORY`( IN CATEGORY_NAME VARCHAR(100), IN CREATED_BY INT,IN  SHOP_ID INT)
BEGIN

IF(SELECT COUNT(*) FROM CATEGORY WHERE categoryName =CATEGORY_NAME AND SHOPID = SHOP_ID) >0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT="Category already exists.";
END IF;

INSERT INTO 
CATEGORY 
(categoryName,
createdBy,
updatedBy,
shopId) 
VALUES(CATEGORY_NAME,
CREATED_BY,
CREATED_BY,
SHOP_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_COLOR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_COLOR`( IN COLOR_NAME VARCHAR(100), IN COLOR_CODE VARCHAR(45), IN CREATED_BY INT,IN  SHOP_ID INT)
BEGIN

IF(SELECT COUNT(*) FROM colors WHERE colorName = COLOR_NAME AND SHOPID = SHOP_ID) >0 THEN
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT="Color Name already exists.";
END IF;

INSERT INTO 
COLORS 
(colorName,
colorCode,
createdBy,
updatedBy,
shopId) 
VALUES(COLOR_NAME,
COLOR_CODE,
CREATED_BY,
CREATED_BY,
SHOP_ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_PRODUCT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_PRODUCT`(
    IN PRODUCT_NAME VARCHAR(100),
    IN ARTICLE_ID INT,
    IN MRP INT UNSIGNED,
    IN ACTUAL_PRICE INT UNSIGNED,
    IN SIZE_VAL INT UNSIGNED,
    IN QUANTITY INT UNSIGNED,
    IN DISCOUNT INT UNSIGNED ,
    IN CATEGORY_ID INT,
    IN COLOR_ID INT,
    IN SHOP_ID INT,
    IN CREATED_BY INT,
    IN SELLING_PRICE INT
)
BEGIN

 IF(SELECT COUNT(*) FROM PRODUCTS WHERE CATEGORYID = CATEGORY_ID AND SHOPID =SHOP_ID AND ARTICLEID=ARTICLE_ID AND SIZE=SIZE_VAL AND COLORID = COLOR_ID) >0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Product already exists.';
 END IF;
 
 IF(SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID ) =0 THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Shop does not exists.';
 END IF;
 
 IF(ACTUAL_PRICE > MRP) THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Actual price can not be greater than  MRP.';
 END IF;
 
 IF (SELECT COUNT(*) FROM ARTICLES WHERE SHOPID = SHOP_ID AND ARTICLEID = ARTICLE_ID) = 0 THEN 
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Article does not exists.';
 END IF;
 
 IF (SELECT COUNT(*) FROM CATEGORY WHERE CATEGORYID = CATEGORY_ID AND SHOPID = SHOP_ID) = 0 THEN 
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Category does not exists.';
 END IF;
 
 IF (SELECT COUNT(*) FROM COLORS WHERE COLORID = COLOR_ID AND SHOPID = SHOP_ID) = 0 THEN 
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Color does not exists.';
 END IF;

    INSERT INTO PRODUCTS (
        productName,
        articleId,
        categoryId,
        quantity,
        mrp,
        actualPrice,
        discount,
        size,
        shopId,
        createdBy,
        updatedBy,
        colorId,
        createdAt,
        updatedAt,
        sellingPrice
    )
    VALUES (
        PRODUCT_NAME,
        ARTICLE_ID,
        CATEGORY_ID,
        QUANTITY,
        MRP,
        ACTUAL_PRICE,
        DISCOUNT,
        SIZE_VAL,
        SHOP_ID,
        CREATED_BY,  -- assuming createdBy and updatedBy are initially the same
        CREATED_BY,
        COLOR_ID,
        CURRENT_TIMESTAMP(),
        CURRENT_TIMESTAMP(),
        SELLING_PRICE
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_SHOP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_SHOP`(
    IN SHOP_NAME VARCHAR(25),
    IN USER_NAME VARCHAR(25),
    IN STATE VARCHAR(100),
    IN CITY VARCHAR(100),
    IN DISTRICT VARCHAR(100),
    IN TAHSIL VARCHAR(100),
    IN LANDMARK VARCHAR(100),
    IN CREATEDBY INT,
    IN UPDATEDBY INT,
    IN VILLAGE VARCHAR(250)
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1
            MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Use the original MySQL error message in the SIGNAL statement
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM shops WHERE shopuserName = USER_NAME) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP USERNAME ALREADY EXISTS.';
    ELSE
        -- Insert the new shop
        INSERT INTO shops (shopName, shopuserName, state, district, tahsil, city, landMark,createdBy,updatedBy,village)
        VALUES (SHOP_NAME, USER_NAME, STATE, DISTRICT, TAHSIL, CITY, LANDMARK,CREATEDBY , UPDATEDBY,VILLAGE);
    END IF;

    COMMIT;

    -- Return the inserted shop
    SELECT * FROM shops WHERE shopId = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `REGISTER_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `REGISTER_USER`(
    IN FIRST_NAME VARCHAR(100),
    IN LAST_NAME VARCHAR(100),
    IN SHOP_ID INT,
    IN MOBILE_NO BIGINT,
    IN EMAIL_ID VARCHAR(100),
    IN USER_NAME VARCHAR(45),
    IN CREATEDBY INT,
    IN UPDATEDBY INT,
    IN ROLE_ID INT
)
BEGIN 
    DECLARE CUSTOME_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check for existing username in the same shop
    IF exists (SELECT * FROM USER WHERE username = USER_NAME AND shopId = SHOP_ID)   THEN
        SET CUSTOME_MESSAGE = 'Username already taken in your shop.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Check for existing email in the same shop
    IF exists (SELECT * FROM USER WHERE email = EMAIL_ID )   THEN
        SET CUSTOME_MESSAGE = 'Email already taken in your shop.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;
    
     -- Check for existing email in the same shop
    IF  (SELECT COUNT(*) FROM SHOPS WHERE  shopId = SHOP_ID) = 0 THEN
        SET CUSTOME_MESSAGE = 'Shop not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Check for existing mobile number in the same shop
    IF (SELECT COUNT(*) FROM USER WHERE mobileNo = MOBILE_NO AND shopId = SHOP_ID) > 0 THEN
        SET CUSTOME_MESSAGE = 'Mobile No. already taken in your shop.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Set the exit handler for any other SQL exceptions
    BEGIN 
        DECLARE EXIT HANDLER FOR SQLEXCEPTION 

        IF CUSTOME_MESSAGE IS NULL OR CUSTOME_MESSAGE = '' THEN
            SET CUSTOME_MESSAGE = 'Error while registering user.';
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END;

    -- Insert the new user into the USER table
    INSERT INTO USER (firstName,roleId, lastName, email, shopId, mobileNo, userName, createdBy, updatedBy,activationToken)
    VALUES (FIRST_NAME, ROLE_ID, LAST_NAME, EMAIL_ID, SHOP_ID, MOBILE_NO, USER_NAME, CREATEDBY, UPDATEDBY,uuid());

    -- Set success message if needed
    SET CUSTOME_MESSAGE = 'User added successfully!';
    SELECT activationToken FROM user WHERE userId = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RESTORE_SHOP_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RESTORE_SHOP_BY_ID`(
    IN SHOP_ID INT 
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1 MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Rollback the transaction in case of an error
        ROLLBACK;

        -- Re-throw the error with the original message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    START TRANSACTION;

    -- Check if the SHOPID exists in the shops table
    IF NOT EXISTS (SELECT 1 FROM shops WHERE shopId = SHOP_ID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP ID DOES NOT EXIST.';
        -- Update the existing shop details
        ELSEIF EXISTS (SELECT 1 FROM SHOPS WHERE shopId = SHOP_ID AND isDeleted = 0) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP IS MUST DELTED FOR RESTORE IT';
		ELSEIF  EXISTS (SELECT 1 FROM SHOPS WHERE shopId = SHOP_ID AND isActive = 1) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP IS ACTIVE CANT RESTORE IT';
			ELSE
        UPDATE shops  SET isActive = 1 , isDeleted =0 , updatedAt = current_time() WHERE shopId = SHOP_ID AND isDeleted = 1 AND isActive =0;
        -- Check if the update was successful
        IF ROW_COUNT() = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'RESTORE SHOP FAILED. SHOP ID NOT FOUND OR NO CHANGES MADE.';
        END IF;
    END IF;

    COMMIT;

    -- Return the updated shop details
    SELECT * FROM shops WHERE shopId = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SEARCH_PRODUCTS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SEARCH_PRODUCTS`(
     IN p_product_name VARCHAR(255),
    IN p_category_id INT, 
     IN p_article_id INT, 
    IN p_color_id INT, 
    IN p_shop_id INT
)
BEGIN
    -- Check if the shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = p_shop_id) = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Shop not found.';
    ELSE
        -- Retrieve products based on search criteria
        SELECT 
            PR.*,
            BR.brandName,
            CT.categoryName,
            AR.articleName,
            CO.colorName
        FROM 
            PRODUCTS PR
        JOIN 
            CATEGORY CT ON PR.CATEGORYID = CT.CATEGORYID
        JOIN 
            ARTICLES AR ON PR.ARTICLEID = AR.ARTICLEID
        JOIN 
            BRANDS BR ON AR.BRANDID = BR.BRANDID
        JOIN 
            COLORS CO ON PR.COLORID = CO.COLORID
        WHERE 
            PR.SHOPID = p_shop_id
            AND (p_category_id IS NULL OR PR.CATEGORYID = p_category_id)
            AND (p_color_id IS NULL OR PR.COLORID = p_color_id)
            AND (p_article_id IS NULL OR PR.ARTICLEID = p_article_id)
            AND (p_product_name IS NULL OR PR.productName LIKE CONCAT('%', p_product_name, '%'))
        LIMIT 50;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SET_PASSWORD` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SET_PASSWORD`(IN TOKEN VARCHAR(45) , IN PASSWORD_VAL VARCHAR(250))
BEGIN
DECLARE CUSTOME_MESSAGE VARCHAR(500) DEFAULT "";
DECLARE EXIT HANDLER FOR SQLEXCEPTION
 BEGIN 
 IF CUSTOME_MESSAGE IS NULL OR CUSTOME_MESSAGE ="" THEN
 SET CUSTOME_MESSAGE =MESSAGE_TEXT;
 END IF;
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
 END;
 
   IF (SELECT COUNT(*) FROM user WHERE activationToken = TOKEN )=0 THEN
 SET CUSTOME_MESSAGE = "Link expired." ;
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
 END IF;
 
 UPDATE USER SET PASSWORD = PASSWORD_VAL , activationToken = null ,isActive = 1 WHERE activationToken = TOKEN ;
 END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_PRODUCT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_PRODUCT`(
    IN PRODUCT_NAME VARCHAR(100),
    IN ARTICLE_ID INT,
    IN MRP INT UNSIGNED,
    IN ACTUAL_PRICE INT UNSIGNED,
    IN SIZE_VAL INT UNSIGNED,
    IN QUANTITY INT UNSIGNED,
    IN DISCOUNT INT UNSIGNED,
    IN CATEGORY_ID INT,
    IN COLOR_ID INT,
    IN SHOP_ID INT,
    IN CREATED_BY INT,
    IN SELLING_PRICE INT,
    IN PRODUCT_ID INT
)
BEGIN
    -- Check if the product already exists
    DECLARE product_exists INT DEFAULT 0;
    
    SELECT COUNT(*) INTO product_exists 
    FROM PRODUCTS 
    WHERE SHOPID = SHOP_ID 
    AND ARTICLEID = ARTICLE_ID 
    AND PRODUCTNAME = PRODUCT_NAME
    and CATEGORYID = CATEGORYID
    AND SIZE = SIZE_VAL 
    AND COLORID = COLOR_ID AND PRODUCTID != PRODUCT_ID  ;
    IF(product_exists >0) THEN 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Product already exists.';
    END IF;

    -- Check if shop exists
    IF (SELECT COUNT(*) FROM SHOPS WHERE SHOPID = SHOP_ID) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Shop does not exist.';
    END IF;

    -- Check if the actual price is not greater than MRP
    IF (ACTUAL_PRICE > MRP) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Actual price cannot be greater than MRP.';
    END IF;

    -- Check if the article exists
    IF (SELECT COUNT(*) FROM ARTICLES WHERE SHOPID = SHOP_ID AND ARTICLEID = ARTICLE_ID) = 0 THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Article does not exist.';
    END IF;

    -- Check if the category exists
    IF (SELECT COUNT(*) FROM CATEGORY WHERE CATEGORYID = CATEGORY_ID AND SHOPID = SHOP_ID) = 0 THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Category does not exist.';
    END IF;

    -- Check if the color exists
    IF (SELECT COUNT(*) FROM COLORS WHERE COLORID = COLOR_ID AND SHOPID = SHOP_ID) = 0 THEN 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Color does not exist.';
    END IF;

    -- If product exists, update it
         UPDATE PRODUCTS
        SET 
            productName = PRODUCT_NAME,
            articleId = ARTICLE_ID,
            categoryId = CATEGORY_ID,
            quantity = QUANTITY,
            mrp = MRP,
            actualPrice = ACTUAL_PRICE,
            discount = DISCOUNT,
            size = SIZE_VAL,
            shopId = SHOP_ID,
            updatedBy = CREATED_BY,
            colorId = COLOR_ID,
            updatedAt = CURRENT_TIMESTAMP(),
            sellingPrice = SELLING_PRICE
        WHERE SHOPID = SHOP_ID 
        AND PRODUCTID = PRODUCT_ID ;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_SHOP_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_SHOP_BY_ID`(
    IN SHOP_NAME VARCHAR(25),
    IN USER_NAME VARCHAR(25),
    IN STATE VARCHAR(100),
    IN CITY VARCHAR(100),
    IN DISTRICT VARCHAR(100),
    IN TAHSIL VARCHAR(100),
    IN LANDMARK VARCHAR(500),
    IN SHOP_ID INT ,
    IN VILLAGE VARCHAR(150)
)
BEGIN
    DECLARE ERROR_MESSAGE VARCHAR(255) DEFAULT '';
    DECLARE MYSQL_ERROR_MESSAGE VARCHAR(255);
    DECLARE CUSTOME_MESSAGE VARCHAR(500);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Capture the actual SQL error message
        GET DIAGNOSTICS CONDITION 1 MYSQL_ERROR_MESSAGE = MESSAGE_TEXT;

        -- Rollback the transaction in case of an error
        ROLLBACK;

        -- Re-throw the error with the original message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MYSQL_ERROR_MESSAGE;
    END;

    START TRANSACTION;

    -- Check if the SHOPID exists in the shops table
    IF NOT EXISTS (SELECT 1 FROM shops WHERE shopId = SHOP_ID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP ID DOES NOT EXIST.';
    ELSEIF EXISTS (SELECT 1 FROM shops WHERE shopuserName = USER_NAME AND shopId != SHOP_ID) THEN
    SET CUSTOME_MESSAGE = "Shop UserName is already exist.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    ELSE
        -- Update the existing shop details
        UPDATE shops 
        SET shopName = SHOP_NAME, shopuserName = USER_NAME, state = STATE, 
            district = DISTRICT, tahsil = TAHSIL, city = CITY, village = VILLAGE, landMark = LANDMARK,updatedAt =current_timestamp()
        WHERE shopId = SHOP_ID;

        -- Check if the update was successful
        IF ROW_COUNT() = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'UPDATE FAILED. SHOP ID NOT FOUND OR NO CHANGES MADE.';
        END IF;
    END IF;

    COMMIT;

    -- Return the updated shop details
    SELECT * FROM shops WHERE shopId = SHOP_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_USER_BY_ID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_USER_BY_ID`(
    IN USER_NAME VARCHAR(25),
    IN USER_ID INT,
    IN MOBILENO BIGINT,
    IN SHOP_ID INT,
    IN EMAIL_VAL VARCHAR(100),
    IN FIRST_NAME VARCHAR(100),
    IN LAST_NAME VARCHAR(100),
    IN ROLE_ID INT,
    IN UPDATED_BY INT
)
BEGIN
    DECLARE ERR_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check if the user exists in the specific shop
    IF (SELECT COUNT(*) FROM USER WHERE USERID = USER_ID AND SHOPID = SHOP_ID) = 0 THEN
        SET ERR_MESSAGE = 'User not found.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ERR_MESSAGE;
    END IF;

    -- Check if the username already exists (excluding the current user)
    IF (SELECT COUNT(*) FROM USER WHERE USERID != USER_ID AND USERNAME = USER_NAME) > 0 THEN
        SET ERR_MESSAGE = 'Username already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ERR_MESSAGE;
    END IF;

    -- Check if the email already exists (excluding the current user)
    IF (SELECT COUNT(*) FROM USER WHERE USERID != USER_ID AND EMAIL = EMAIL_VAL) > 0 THEN
        SET ERR_MESSAGE = 'Email already exists.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ERR_MESSAGE;
    END IF;

    -- If all validations pass, proceed with the update
    UPDATE USER 
    SET USERNAME = USER_NAME, 
        ROLEID = ROLE_ID, 
        MOBILENO = MOBILENO, 
        EMAIL = EMAIL_VAL, 
        FIRSTNAME = FIRST_NAME, 
        LASTNAME = LAST_NAME, 
        UPDATEDAT = CURRENT_TIMESTAMP(), 
        UPDATEDBY = UPDATED_BY
    WHERE SHOPID = SHOP_ID AND USERID = USER_ID;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VERIFY_USER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VERIFY_USER`(
    IN IDENTIFIER VARCHAR(250)
)
BEGIN
    DECLARE MESSAGE VARCHAR(500) DEFAULT "";
    DECLARE USER_COUNT INT DEFAULT 0;
    DECLARE ACTIVE_COUNT INT DEFAULT 0;
    DECLARE SHOP_ACTIVE_COUNT INT DEFAULT 0;

    -- Handle any SQL exception and set the appropriate error message
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        IF MESSAGE IS NULL OR MESSAGE = "" THEN 
            SET MESSAGE = "An error occurred during user verification.";
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END;

    -- Check if the user exists (by username or email)
    SELECT COUNT(*) INTO USER_COUNT
    FROM USER
    WHERE username = IDENTIFIER OR email = IDENTIFIER;

    -- Validate user existence
    IF USER_COUNT = 0 THEN
        SET MESSAGE = "Username or email is not correct.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END IF;   

    -- Check if the user is active
    SELECT COUNT(*) INTO ACTIVE_COUNT
    FROM USER
    WHERE (username = IDENTIFIER OR email = IDENTIFIER) AND isActive = 1;

    -- Validate user active status
    IF ACTIVE_COUNT = 0 THEN
        SET MESSAGE = "User not active, please activate your account.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END IF;

    -- Check if the shop is active
    SELECT COUNT(*) INTO SHOP_ACTIVE_COUNT
    FROM SHOPS
    WHERE shopId = (SELECT shopId FROM USER WHERE (username = IDENTIFIER OR email = IDENTIFIER)) 
    AND isActive = 1;

    -- Validate shop active status
    IF SHOP_ACTIVE_COUNT = 0 THEN
        SET MESSAGE = "Shop is not active, please contact the shop owner.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
    END IF;

    -- Retrieve the role and other details if the user and shop are active
    SELECT r.roleName, u.*
    FROM roles r
    JOIN USER u ON r.roleId = u.roleId
    WHERE (u.username = IDENTIFIER OR u.email = IDENTIFIER);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 12:26:34
