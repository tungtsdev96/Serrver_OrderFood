-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: ptpmcn
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `a` (`customer_id`),
  CONSTRAINT `a` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,1,'Phố Vọng'),(2,1,'Trần Duy Hưng'),(3,2,'Phố Vọng'),(10,1,'Hồ Hoàn Kiếm');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `admin_phone` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `socket_id` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `key10_idx` (`restaurent_id`),
  CONSTRAINT `key10` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Phạm Hải Linh','linhph','123456','01667645238','hGFQnMyFIfqucxXlAAAR',1),(2,'Trần Sơn Tùng','tungts','123456','0123456789','zB4kFvS7cs5_a5eLAACU',2),(3,'Nguyễn Văn Đức','ducnv','123456','01254785654','g6gVgPx69X_KIEo9AAAV',3);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_description` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  `system_category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `aaaaaa_idx` (`restaurent_id`),
  KEY `fk_category_1_idx` (`system_category_id`),
  CONSTRAINT `aaaaaa` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_1` FOREIGN KEY (`system_category_id`) REFERENCES `system_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Milk Tea','1',1,1),(2,'Fresh Frust Tea','1',2,1),(3,'Special Drink','1',3,1),(4,'Handmade Drink','1',4,1),(5,'Mice Ice','1',5,1),(6,'Chocolate','1',6,1),(7,'Soda','1',1,1),(8,'Milk Tea','1',3,1),(9,'Soda','1',3,1),(10,'Fresh frust tea','1',3,1),(11,'Special Drink','1',1,1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  `content` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fff_idx` (`customer_id`),
  KEY `ffff_idx` (`restaurent_id`),
  CONSTRAINT `fff` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ffff` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'buồn ngủ quá');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_first_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_last_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_phone` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token_id` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'linhpham','123','Linh','Pham','Phạm Hải Linh','01667645238','linhphamdev96@gmail.com','123456'),(2,'linhpham2','123',NULL,NULL,'Nguyễn Thị Tuyết Ngân','01639511350','nganvic@gmail.com',NULL),(3,'ngannn','123','Ngan','Nguyen','Nguyen thi Tuyet Ngan','01639511350','adasfgj@gmail.com',NULL),(4,'tungts','123','Tung','Tran','Tran Son Tung Nui','09696454684','tungnui96@gmail.com',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `key3_idx` (`product_id`),
  KEY `key4_idx` (`customer_id`),
  CONSTRAINT `key3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `key4` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,200,1),(2,190,1),(3,191,1),(4,192,1),(5,193,1),(6,194,1),(7,195,1),(8,196,1),(9,197,1),(10,198,1),(11,199,1),(12,180,1),(13,181,1),(14,182,1),(16,184,1),(17,185,1),(18,186,1),(19,187,1),(20,188,1),(21,189,1),(22,190,2),(23,191,2),(24,192,2),(25,193,2),(26,194,2),(27,195,2),(28,196,2),(29,197,2),(30,198,2),(31,199,2),(32,180,2),(33,181,2),(34,182,2),(35,183,2),(36,184,2),(37,185,2),(38,186,2),(39,187,2),(40,188,2),(41,189,2),(42,251,1),(43,251,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detail` (
  `detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `detail_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `key2_idx` (`order_id`),
  KEY `key5_idx` (`product_id`),
  CONSTRAINT `key2` FOREIGN KEY (`order_id`) REFERENCES `order_product` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `key5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (37,25,181,2),(38,25,187,1),(39,26,187,1),(40,26,181,2),(41,27,199,1),(42,27,193,1),(43,27,240,1),(44,28,199,1),(45,29,199,1),(46,30,241,1),(47,31,1,4),(48,32,246,4),(49,33,246,1),(50,34,3,1),(51,34,183,1),(52,34,222,1),(53,35,3,1),(54,35,222,1),(55,36,189,1),(56,36,226,1),(57,37,227,1),(58,38,223,1),(59,39,238,1),(60,40,229,1),(61,41,236,2),(62,41,235,3),(63,42,236,1),(64,42,231,1),(65,43,231,1),(66,44,231,1),(67,45,241,5),(68,45,242,4),(69,46,238,8),(70,47,241,7),(71,47,251,1),(72,48,241,7),(73,48,251,1),(74,49,243,5),(75,49,240,1),(76,49,241,4),(77,50,1,1);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_product` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_time` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `order_cost` int(11) DEFAULT NULL,
  `order_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_distance` double DEFAULT NULL,
  `order_description` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_feedback` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_status` int(11) DEFAULT '0',
  `customer_id` int(11) DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `key6_idx` (`customer_id`),
  KEY `sf_idx` (`restaurent_id`),
  CONSTRAINT `key6` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sf` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (25,'2017-12-07 04:18:46','2017-11-30 17:00:00','0125465',135000,'459 Bạch Mai, Hai Bà Trưng, Hà Nội',4.5,'This is the description',NULL,0,1,2),(26,'2017-12-07 04:20:31','2017-11-30 17:00:00','0125465',135000,'459 Bạch Mai, Hai Bà Trưng, Hà Nội',4.5,'This is the description',NULL,2,1,1),(27,'2017-12-07 04:25:22','2017-12-02 05:00:00','0125465',135000,'Ngõ 1 Tôn Thất Tùng',3.5,'Order no.1',NULL,2,1,1),(28,'2017-12-07 04:26:09','2017-12-02 05:00:00','0125465',49000,'Ngõ 1 Tôn Thất Tùng',3.5,'Order no.2',NULL,2,1,1),(29,'2017-12-07 04:27:27','2017-12-02 04:00:00','0125465',49000,'Số 1 Đại Cồ Việt',2.5,'Order no.3',NULL,2,1,1),(30,'2017-12-07 04:29:47','2017-12-02 04:00:00','0125465',47000,'Số 19 Trần Đại Nghĩa',2.5,'Order no.4',NULL,2,1,1),(31,'2017-12-07 04:31:24','2017-12-07 04:00:00','0125465',172000,'Số 31 Trần Đại Nghĩa',2.5,'Order no.5',NULL,2,1,1),(32,'2017-12-07 04:34:05','2017-12-07 04:00:00','0125465',53000,'Số 20 Trần Đại Nghĩa',2.5,'Order no.6',NULL,2,1,1),(33,'2017-12-07 04:34:32','2017-12-07 04:00:00','0125465',53000,'Số 56 Lê Thanh Nghị',1.5,'Order no.7',NULL,-1,1,1),(34,'2017-12-07 04:37:55','2017-12-07 04:00:00','0125465',100000,'Số 56 Lê Thanh Nghị',1.5,'Order no.8',NULL,2,3,3),(35,'2017-12-07 04:38:31','2017-12-07 03:00:00','0125465',65000,'Số 72 Lê Thanh Nghị',1.5,'Order no.9',NULL,2,3,3),(36,'2017-12-07 04:39:38','2017-12-07 02:00:00','0125465',70000,'Số 84 Lê Thanh Nghị',1.5,'Order no.10',NULL,2,3,3),(37,'2017-12-07 04:42:01','2017-12-06 01:00:00','0125465',25000,'Số 91 Lê Thanh Nghị',1.5,'Order no.11',NULL,2,3,3),(38,'2017-12-07 04:44:07','2017-12-06 08:00:00','0125465',25000,'Số 30 Giải Phóng',1.5,'Order no.12',NULL,2,3,3),(39,'2017-12-07 04:45:06','2017-12-06 08:00:00','0125465',30000,'Số 32 Phạm Ngọc Thạch Hà Nội',1.5,'Order no.13',NULL,2,3,3),(40,'2017-12-07 04:45:55','2017-12-05 05:00:00','0125465',30000,'Số 15 Phạm Ngọc Thạch Hà Nội',3,'Order no.14',NULL,2,3,3),(41,'2017-12-07 04:48:58','2017-12-04 08:00:00','0125465',135000,'Số 15 Chùa Bộc Hà Nội',3,'Order no.15',NULL,2,3,3),(42,'2017-12-07 04:51:30','2017-12-03 14:00:00','0125465',65000,'Số 36 Chùa Bộc Hà Nội',3,'Order no.14',NULL,2,3,3),(43,'2017-12-07 04:51:54','2017-12-03 11:00:00','0125465',35000,'Số 36 Chùa Bộc Hà Nội',3,'Order no.14',NULL,2,3,3),(44,'2017-12-07 04:53:05','2017-12-03 11:00:00','0125465',35000,'Số 36 Chùa Bộc Hà Nội',3,'Order no.14',NULL,2,3,1),(45,'2017-12-07 05:00:38','2017-12-07 05:00:00','01687037749',552515,'Trần Duy Hưng',8.643,'undefined',NULL,2,1,1),(46,'2017-12-07 05:07:42','2017-12-07 05:07:00','01687037749',307215,'Trần Duy Hưng',8.643,'undefined',NULL,2,1,3),(47,'2017-12-07 09:42:19','2017-12-08 05:42:00','01687037749',454615,'Trần Duy Hưng',8.643,'undefined',NULL,2,1,1),(48,'2017-12-07 09:42:47','2017-12-08 05:42:00','01687037749',454615,'Trần Duy Hưng',8.643,'undefined',NULL,2,1,1),(49,'2017-12-10 10:56:31','2017-12-10 10:56:00','01687037749',566815,'Trần Duy Hưng',8.643,'undefined',NULL,2,1,1),(50,'2017-12-12 06:06:51','2017-12-13 10:00:00','01687037749',68304,'Hồ Hoàn Kiếm',4.201,'undefined',NULL,2,1,1);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  `order_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `number_people` int(11) DEFAULT NULL,
  `code` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `rt_idx` (`customer_id`),
  KEY `ty_idx` (`restaurent_id`),
  CONSTRAINT `rt` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ty` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES (1,1,1,'2017-12-10 17:00:00','2017-12-11 03:00:00','2017-12-11 04:00:00',6,'2423',1),(2,1,1,'2017-12-10 17:00:00','2017-12-11 11:00:00','2017-12-11 13:00:00',6,'234',1),(3,1,1,'2017-12-10 17:00:00','2017-12-11 12:00:00','2017-12-11 14:00:00',12,'5244',1),(4,1,1,'2017-12-10 17:00:00','2017-12-12 04:00:00','2017-12-12 05:00:00',16,'234',5),(5,1,1,'2017-12-10 17:00:00','2017-12-12 01:00:00','2017-12-12 03:00:00',12,'qe',5),(6,1,1,'2017-12-10 17:00:00','2017-12-12 10:00:00','2017-12-12 11:00:00',10,'24234',1),(7,1,1,'2017-12-10 17:00:00','2017-12-13 03:00:00','2017-12-13 05:00:00',6,'qweqr',4),(8,1,1,'2017-12-10 17:00:00','2017-12-13 07:00:00','2017-12-13 11:00:00',3,'523423',4),(9,1,1,'2017-12-10 17:00:00','2017-12-13 08:00:00','2017-12-13 11:00:00',2,'254243',3),(10,1,1,'2017-12-10 17:00:00','2017-12-13 13:00:00','2017-12-13 15:00:00',10,'qeqw4',3),(11,1,1,'2017-12-10 21:17:03','2017-12-15 10:00:00','2017-12-15 11:00:00',12,'389u535u',3),(12,1,2,'2017-12-11 19:21:54','2017-12-15 10:00:00','2017-12-15 11:00:00',12,'389u535u',2),(21,1,1,'2017-12-12 06:16:31','2017-12-12 10:00:00','2017-12-12 15:00:00',16,'XT413BT',1);
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_table_detail`
--

DROP TABLE IF EXISTS `order_table_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_table_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_table_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `table_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aasd_idx` (`table_id`),
  KEY `asdasd_idx` (`order_table_id`),
  CONSTRAINT `aasd` FOREIGN KEY (`table_id`) REFERENCES `restaurent_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `asdasd` FOREIGN KEY (`order_table_id`) REFERENCES `order_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=ucs2 COLLATE=ucs2_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table_detail`
--

LOCK TABLES `order_table_detail` WRITE;
/*!40000 ALTER TABLE `order_table_detail` DISABLE KEYS */;
INSERT INTO `order_table_detail` VALUES (1,1,1,1),(2,2,1,1),(3,3,2,2),(4,3,3,3),(5,4,1,1),(6,4,2,2),(7,4,3,3),(8,5,1,1),(9,5,2,2),(10,6,1,1),(11,6,2,2),(12,7,1,1),(13,8,1,1),(14,9,2,2),(15,10,1,1),(16,11,2,2),(17,11,6,6),(18,11,5,5),(19,12,2,2),(20,12,5,5),(46,21,11,11),(47,21,12,12),(48,21,13,13),(49,21,14,14);
/*!40000 ALTER TABLE `order_table_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_description` varchar(400) CHARACTER SET utf8 DEFAULT NULL,
  `product_image` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `key1_idx` (`category_id`),
  CONSTRAINT `key1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Trà Gừng Kem Cheese','Trà Gừng Kem Cheese tốt cho sức khỏe','http://localhost:3000/upload/1512618646463.jpg',43000,7),(2,'Trà Sữa','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://thuonghieuvietnoitieng.vn/images/brand/2016/01/original/99554_ADR-21732618-thoa-suc-thuong-thuc-tra-sua-toco-4d9803bc-4bb3-42c6-a466-b05357813326.jpg',30000,2),(3,'Trà Nhật Đậu đỏ','trà đậu nhật đỏ thanh mát, tốt cho sức khỏe','http://localhost:3000/upload/1512446797668.jpg',35000,8),(14,'Banana','Hồng trà ô long là một loại trà rất được ưa chuộng trê','https://media.foody.vn/res/g28/274442/s600x600/201773165359-tra-sua-hokkaido.jpg',26000,2),(81,'Hồng trà Ô Long','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://localhost:3000/upload/1512446957456.jpg',25000,3),(180,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,6),(181,'Trà Sữa Kem Cheese','Trà Sữa thơm mát, béo ngậy','http://localhost:3000/upload/1512616431226.jpg',45000,1),(182,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,2),(183,'Trà sữa matcha','Trà sữa matcha rất được giới trẻ ưa chuộng','http://localhost:3000/upload/1512447391781.jpg',30000,8),(184,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,4),(185,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,5),(186,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,6),(187,' Trà Sữa Trân Châu Ngọc Trai','Thả ga với ly trà sữa nhiều Trân Châu :D','http://localhost:3000/upload/1512616546572.jpg',45000,1),(188,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,2),(189,'Trà long nhãn táo tàu','Trà long nhãn táo tàu rất tốt cho sức khỏe','http://localhost:3000/upload/1512447523279.jpg',40000,3),(190,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,4),(191,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,5),(192,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,6),(193,' Trà Sữa Đậu Đỏ','Trà sữa matcha đậu đỏ đang là thức uống được ưa chuộng nhiều ','http://localhost:3000/upload/1512616716132.jpg',43000,1),(194,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,2),(195,'Trà Gừng','Trà Gừng tốt cho sức khỏe, thích hợp nhiều độ tuổi','http://localhost:3000/upload/1512447723454.jpg',30000,3),(196,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,4),(197,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,5),(198,'Diet Pepsi','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,6),(199,'Trà Phổ Nhĩ Kem Cheese','Trà Phổ Nhĩ Kem Cheese là loại đặc biệt của trà sữa kem cheese','http://localhost:3000/upload/1512616801683.jpg',49000,1),(200,'Tung','Hồng trà ô long là một loại trà rất được ưa chuộng trê','http://vuakhuyenmai.vn/wp-content/uploads/2016/04/15-3.jpg',12000,2),(222,'Hồng trà sữa','thanh mát','http://localhost:3000/upload/1512446478147.jpg',35000,8),(223,'Soda bạc hà','Soda bạc hà mát lạnh!','http://localhost:3000/upload/1512447833615.jpg',25000,9),(224,'Soda Chanh','Soda chanh mát lạnh, rất được ưa chuộng','http://localhost:3000/upload/1512447986932.jpg',25000,9),(225,'Soda Dâu','Hãy thưởng thức 1 ly Soda dâu mát lạnh đánh bay cái nóng mùa hè ','http://localhost:3000/upload/1512448093561.jpg',25000,9),(226,'Cocktail dâu chanh','Cocktail dâu chanh ngon và độc đáo!','http://localhost:3000/upload/1512448196066.jpg',30000,3),(227,'Nước ép dâu tây','Nước ép dâu tây tốt cho sức khỏe','http://localhost:3000/upload/1512448421828.jpg',25000,10),(228,'Nước cam ép','Nước cam ép tốt cho sức khỏe, giải khát tốt','http://localhost:3000/upload/1512448526182.jpg',25000,10),(229,'Trà đào','Trà đào thơm ngon','http://localhost:3000/upload/1512448742706.jpg',30000,10),(230,'Trà Sữa Oreo','một loại trà mới mà giới trẻ phát cuồng ','http://localhost:3000/upload/1512448886211.jpg',25000,8),(231,'Trà sữa Caramen muối hoa hồng','Phiên bản đặc biệt của trà sữa Hoa Hồng','http://localhost:3000/upload/1512449033040.jpg',35000,8),(232,'Trà sữa thạch cà phê','Lạ miệng với trà sữa thạch cà phê vừa thơm vừa mát','http://localhost:3000/upload/1512449258528.jpg',25000,8),(233,'Trà sữa chanh leo','Lạ miệng với trà sữa chanh leo thơm mát','http://localhost:3000/upload/1512449350063.jpg',30000,8),(234,'Sữa chua dâu tây','sữa chua dâu tây thanh mát, hấp dẫn','http://localhost:3000/upload/1512449479881.jpg',30000,10),(235,'Sữa chua nếp cẩm','thơm ngon đến muỗng cuối cùng','http://localhost:3000/upload/1512449607385.jpg',25000,3),(236,'Sữa chua uống trái cây','Thơm mát, và đặc biệt tốt cho tiêu hóa','http://localhost:3000/upload/1512449846631.jpg',30000,3),(237,'Soda gừng','Thức uống thanh nhiệt cho ngày hè oi bức','http://localhost:3000/upload/1512449993226.jpg',25000,9),(238,'Soda Nho','Quá tuyệt với :D','http://localhost:3000/upload/1512450105665.jpg',30000,9),(239,'Nước hoa quả đặc biệt','Thơm mát và tốt cho sức khỏe','http://localhost:3000/upload/1512450329650.jpg',30000,10),(240,' Trà Sữa Double Oreo','Vị cà phê béo ngậy thơm mát','http://localhost:3000/upload/1512617684887.jpg',43000,1),(241,' Socola Cake Cream','một dạng kem socola tuyệt vời','http://localhost:3000/upload/1512617795991.jpg',47000,11),(242,'Trà Hoa Quả Royaltea Đặc Biệt','Thức uống cho ngày hè oi bức','http://localhost:3000/upload/1512617969390.jpg',57000,11),(243,'Trà Chanh Leo Kim Quất Mật Ong','thơm mát, tốt cho sức khỏe','http://localhost:3000/upload/1512618098083.jpg',49000,11),(244,'Trà Bá Tước Chanh','Thơm mát, giải nhiệt tốt','http://localhost:3000/upload/1512618218122.jpg',45000,11),(245,'Socola Kem Cheese','Socola Kem Cheese béo ngậy','http://localhost:3000/upload/1512618317271.jpg',49000,11),(246,' Xoài Đá Xay Kem Cheese','1 loại sinh tố trái cây được ưa chuộng','http://localhost:3000/upload/1512618457313.jpg',53000,7),(247,' Trà Ô Long Nho Kem Cheese','\r\nTrà Ô Long Nho Kem Cheese thanh mát, rất được ưa chuộng','http://localhost:3000/upload/1512618759709.jpg',63000,1),(248,'Matcha Uji','Vì trà xanh quá tuyệt vời','http://localhost:3000/upload/1512618840507.jpg',45000,11),(249,'Trà Xanh Dưa Lưới','Thức uống hoa quả thơm mát, thanh nhiệt ','http://localhost:3000/upload/1512618919503.jpg',53000,7),(250,'Lục Trà Dâu Tây Kem Cheese','Thức uống được ưa chuộng của giới trẻ','http://localhost:3000/upload/1512619030591.jpg',53000,11),(251,'Trà Sữa Trân Châu Hoàng Kim','Thức uống được giới trẻ ưa chuộng','http://localhost:3000/upload/1512619122493.jpg',45000,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `qw_idx` (`customer_id`),
  KEY `we_idx` (`restaurent_id`),
  CONSTRAINT `qw` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `we` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurent`
--

DROP TABLE IF EXISTS `restaurent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurent` (
  `restaurent_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurent_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_image` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_introduction` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restaurent_number_table` int(11) DEFAULT NULL,
  `restaurent_latitude` double DEFAULT NULL,
  `restaurent_longitude` double DEFAULT NULL,
  PRIMARY KEY (`restaurent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurent`
--

LOCK TABLES `restaurent` WRITE;
/*!40000 ALTER TABLE `restaurent` DISABLE KEYS */;
INSERT INTO `restaurent` VALUES (1,'Royal Tea Bạch Mai','27 Bạch Mai, Cầu Dền, Hai Bà Trưng, Hà Nội','4','http://www.ozarlington.com/wp-content/uploads/2017/04/bar-buffet.jpg','Không gian bày trí đẹp. 1 tầng ngồi bệt 1 tầng có bàn ghế. Nhân viên  rất lịch sự!',30,100,100),(2,'Feeling Tea','Sô 200 Trần Đại Nghĩa - Hai Bà Trưng - Hà Nội','2','https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg','Intro1',50,20,15),(3,'Ctea Fun Tea Coffee','Số 250 Trần Đại Nghĩa - Hai Bà Trưng - Hà Nội','1','http://www.theriverside.co.uk/images/Inside-Restaurant.jpg','Quán đẹp, tuy chiều rộng nhỏ nhưng sâu.',25,30,35),(4,'Tocotoco','Số 250 Bạch Mai - Hai Bà Trưng - Hà Nội','3','http://www.stanleyhotel.com/uploads/9/8/6/9/98696462/published/20111115-cascades001v2_3.jpeg?1492712982','Intro1',15,45,45),(5,'Urban Station','Số 6 Tạ Quang Bửu - Hai Bà Trưng - Hà Nội','4','http://www.c.amsterdam/wp-content/uploads/2015/09/restaurant-c-michiel-van-der-eerde-amsterdam-2.jpg','Intro1',35,12,14),(6,'Bách Khoa','Số 6 Đại Cồ Viêt - Hai Bà Trưng - Hà Nội','4','http://www.c.amsterdam/wp-content/uploads/2015/09/restaurant-c-michiel-van-der-eerde-amsterdam-2.jpg','Intro1',15,15,15);
/*!40000 ALTER TABLE `restaurent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurent_table`
--

DROP TABLE IF EXISTS `restaurent_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurent_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_number` int(11) DEFAULT NULL,
  `table_floor` int(11) DEFAULT NULL,
  `restaurent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fghj_idx` (`restaurent_id`),
  CONSTRAINT `fghj` FOREIGN KEY (`restaurent_id`) REFERENCES `restaurent` (`restaurent_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurent_table`
--

LOCK TABLES `restaurent_table` WRITE;
/*!40000 ALTER TABLE `restaurent_table` DISABLE KEYS */;
INSERT INTO `restaurent_table` VALUES (1,1,1,1),(2,2,1,1),(3,3,1,1),(4,4,1,1),(5,5,1,1),(6,6,1,1),(7,7,1,1),(8,8,1,1),(9,9,2,1),(10,10,2,1),(11,11,2,1),(12,12,2,1),(13,13,2,1),(14,14,2,1),(15,15,2,1);
/*!40000 ALTER TABLE `restaurent_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurent_type`
--

DROP TABLE IF EXISTS `restaurent_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurent_type` (
  `id` int(11) NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurent_type`
--

LOCK TABLES `restaurent_type` WRITE;
/*!40000 ALTER TABLE `restaurent_type` DISABLE KEYS */;
INSERT INTO `restaurent_type` VALUES (1,'Hải sản','1'),(2,'Đồ nướng','1'),(3,'Đồ uống - Coffe','1'),(4,'Đồ uống - Trà sữa','1'),(5,'Lẩu','1'),(6,'Đồ ăn nhanh','1'),(7,'Đồ ăn chậm','1');
/*!40000 ALTER TABLE `restaurent_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search`
--

DROP TABLE IF EXISTS `search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `search` (
  `customer_id` int(11) NOT NULL,
  `content` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `sda` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search`
--

LOCK TABLES `search` WRITE;
/*!40000 ALTER TABLE `search` DISABLE KEYS */;
INSERT INTO `search` VALUES (1,'mai');
/*!40000 ALTER TABLE `search` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_admin`
--

DROP TABLE IF EXISTS `system_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_admin`
--

LOCK TABLES `system_admin` WRITE;
/*!40000 ALTER TABLE `system_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_category`
--

DROP TABLE IF EXISTS `system_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_category`
--

LOCK TABLES `system_category` WRITE;
/*!40000 ALTER TABLE `system_category` DISABLE KEYS */;
INSERT INTO `system_category` VALUES (1,'Đồ ăn nhanh','No'),(2,'Đồ uống','No'),(3,'Đồ ăn','No');
/*!40000 ALTER TABLE `system_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-29 15:58:20
