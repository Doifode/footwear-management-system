-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: fms
-- ------------------------------------------------------
-- Server version	8.0.36

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_USERS_BY_SHOP_ID`(IN SHOP_ID INT)
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
    SELECT * FROM USER WHERE SHOPID = SHOP_ID;
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

    IF EXISTS (SELECT 1 FROM shops WHERE userName = USER_NAME) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SHOP USERNAME ALREADY EXISTS.';
    ELSE
        -- Insert the new shop
        INSERT INTO shops (shopName, userName, state, district, tahsil, city, landMark,createdBy,updatedBy,village)
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
    IN UPDATEDBY INT
)
BEGIN 
    DECLARE CUSTOME_MESSAGE VARCHAR(500) DEFAULT '';

    -- Check for existing username in the same shop
    IF exists (SELECT * FROM USER WHERE username = USER_NAME AND shopId = SHOP_ID)   THEN
        SET CUSTOME_MESSAGE = 'Username already taken in your shop.';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    END IF;

    -- Check for existing email in the same shop
    IF exists (SELECT * FROM USER WHERE email = EMAIL_ID AND shopId = SHOP_ID)   THEN
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
    INSERT INTO USER (firstName, lastName, email, shopId, mobileNo, userName, createdBy, updatedBy,activationToken)
    VALUES (FIRST_NAME, LAST_NAME, EMAIL_ID, SHOP_ID, MOBILE_NO, USER_NAME, CREATEDBY, UPDATEDBY,uuid());

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
    ELSEIF EXISTS (SELECT 1 FROM shops WHERE userName = USER_NAME AND shopId != SHOP_ID) THEN
    SET CUSTOME_MESSAGE = "Shop UserName is already exist.";
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = CUSTOME_MESSAGE;
    ELSE
        -- Update the existing shop details
        UPDATE shops 
        SET shopName = SHOP_NAME, userName = USER_NAME, state = STATE, 
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
IN IDENTIFIER VARCHAR(250),
IN SHOP_USER_NAME VARCHAR(100)
)
BEGIN 
  DECLARE MESSAGE VARCHAR(500) DEFAULT "";
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
BEGIN
IF MESSAGE IS NULL OR MESSAGE ="" THEN 
SET MESSAGE = MESSAGE_TEXT;
END IF;
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
END;

IF  (SELECT count(*) FROM USER where username = IDENTIFIER or email =IDENTIFIER)=0
    AND 
    (SELECT count(*) FROM SHOPS where username = SHOP_USER_NAME)=0 THEN
 SET MESSAGE = "Invalid credentials.";
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
END IF;

IF  (SELECT count(*) FROM user where username = IDENTIFIER or email = IDENTIFIER )=0 THEN
 SET MESSAGE = "Username is not correct.";
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
END IF;

IF  (SELECT count(*) FROM SHOPS where username = SHOP_USER_NAME)=0 THEN
 SET MESSAGE = "Shop Username is not correct.";
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = MESSAGE;
END IF;

  SELECT *  FROM USER WHERE USERNAME = IDENTIFIER AND SHOPID= (select SHOPID from shops where username = SHOP_USER_NAME);
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

-- Dump completed on 2024-09-16 10:27:13
