CREATE DATABASE  IF NOT EXISTS `spgames_stx` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spgames_stx`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: spgames_stx
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryid`),
  UNIQUE KEY `catname_UNIQUE` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Action','An action game emphasizes physical challenges, including hand–eye coordination and reaction-time','2020-12-14 15:14:27'),(2,'RPG','A role-playing game is a game in which players assume the roles of characters in a fictional setting. Players take responsibility for acting out these roles within a narrative, either through literal acting, or through a process of structured decision-making regarding character development.','2020-12-14 21:15:08'),(3,'Adventure','Adventure games are categorized by the style of gameplay, not the story or content. And while technology has given developers new options to explore storytelling in the genre, at a basic level, adventure games haven’t evolved much from their text-based origins.','2020-12-15 10:08:23'),(4,'FPS','First-person shooter is a video game genre centered on gun and other weapon-based combat in a first-person perspective; that is, the player experiences the action through the eyes of the protagonist.','2021-01-03 16:14:46'),(5,'Action-Adventure Games','Action-adventure games most frequently incorporate two game mechanics—game-long quests or obstacles that must be conquered using a tool or item collected, as well as an action element where the item(s) are used.','2021-01-03 16:27:40'),(6,'Strategy','With gameplay is based on traditional strategy board games, strategy games give players a godlike access to the world and its resources. These games require players to use carefully developed strategy and tactics to overcome challenges. More recently, these type of games have moved from turn-based systems to real-time gameplay in response to player feedback.','2021-01-03 16:28:29'),(7,'Sports','Sports games simulate sports like golf, football, basketball, baseball, and soccer. They can also include Olympic sports like skiing, and even pub sports like darts and pool. Opposing players in these games are often computer-controlled but can also take the form of live opponents. ','2021-01-03 16:29:16'),(8,'Puzzle','Puzzle or logic games usually take place on a single screen or playfield and require the player to solve a problem to advance the action.','2021-01-03 16:29:42'),(17,'Shooter','Shooters let players use weapons to engage in the action, with the goal usually being to take out enemies or opposing players.','2021-01-31 12:39:20'),(19,'Racing ','Racing games are a video game genre in which the player participates in a racing competition with any type of land, water, air, or space vehicles. They may be based on anything from real-world racing leagues to fantastical settings. They are distributed along a spectrum between simulations and simplified arcade-style racing games. Go-kart racing games emerged in the 1990s as a popular sub-genre of the latter. Racing games may also fall under the category of sports games.','2021-01-31 12:50:23'),(35,'I love BED','I love MR TAN','2021-02-02 21:43:39'),(36,'High Marks PLZ','Please Give me high marks','2021-02-02 22:50:57'),(39,'Testing MF','hahah','2021-02-07 22:23:20');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category_reference`
--

DROP TABLE IF EXISTS `game_category_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category_reference` (
  `game_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`game_id`,`category_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category_reference`
--

LOCK TABLES `game_category_reference` WRITE;
/*!40000 ALTER TABLE `game_category_reference` DISABLE KEYS */;
INSERT INTO `game_category_reference` VALUES (1,1),(2,1),(4,1),(5,1),(55,1),(1,2),(4,2),(5,2),(55,2),(79,2),(5,3),(2,4),(4,4),(55,4),(81,6),(3,7),(81,7),(81,17),(6,19),(79,35),(80,35),(82,35),(83,35),(80,36),(82,36),(83,36);
/*!40000 ALTER TABLE `game_category_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_image`
--

DROP TABLE IF EXISTS `game_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_image` (
  `img_game_id` int NOT NULL,
  `img_path` varchar(255) NOT NULL DEFAULT 'game_image/default.jpg',
  PRIMARY KEY (`img_game_id`),
  CONSTRAINT `img_game_id` FOREIGN KEY (`img_game_id`) REFERENCES `games` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_image`
--

LOCK TABLES `game_image` WRITE;
/*!40000 ALTER TABLE `game_image` DISABLE KEYS */;
INSERT INTO `game_image` VALUES (1,'game_image/game1.jpg'),(2,'game_image/game2.jpg'),(3,'game_image/game3.jpg'),(4,'game_image/game4.jpg'),(5,'game_image/game5.jpg'),(6,'game_image/game6.jpg'),(55,'game_image/game55.jpg'),(79,'game_image/game79.jpg'),(80,'game_image/game80.jpg'),(81,'game_image/game81.jpg'),(82,'game_image/game82.jpg'),(83,'game_image/game83.jpg');
/*!40000 ALTER TABLE `game_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(255) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameid`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Assassin’s Creed Valhalla','Assassin\'s Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft. It is the twelfth major installment and the twenty-second release in the Assassin\'s Creed series, and a successor to the 2018\'s Assassin\'s Creed Odyssey.','69.90','PC','2020','2020-12-15 06:23:18'),(2,'Call of Duty: Modern Warfare','Call of Duty: Modern Warfare is a 2019 first-person shooter video game developed by Infinity Ward and published by Activision','88','PC','2019','2021-01-03 08:13:17'),(3,'F1 2020','F1 2020 is the official video game of the 2020 Formula 1 and Formula 2 Championships developed and published by Codemasters. It is the thirteenth title in the Formula 1 series developed by the studio and was released on 7 July 2020 for pre-orders of the Michael Schumacher Edition and 10 July 2020 for the Seventy Edition on Microsoft Windows, PlayStation 4, Xbox One and, for the first time, Stadia.[1] The game is the twelfth installment in the franchise, and it features the twenty-two circuits, twenty drivers and ten teams proposed in the provisional 2020 Formula 1 World Championship.','51','PC','2020','2021-01-03 08:33:17'),(4,'Cyberpunk 2077','Cyberpunk 2077 is a 2020 action role-playing video game developed and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe','49.99','PC','2020','2021-01-03 08:42:16'),(5,'watch dog: legion','Watch Dogs: Legion is a 2020 action-adventure game published by Ubisoft and developed by its Toronto studio. It is the third instalment in the Watch Dogs series, and the sequel to 2016\'s Watch Dogs 2.','53.53','PC','2020','2021-01-03 08:43:26'),(6,'Forza Horizon 4','Forza Horizon 4 is a 2018 racing video game developed by Playground Games and published by Microsoft Studios. It was released on 2 October 2018 on Xbox One and Microsoft Windows after being announced at Xbox\'s E3 2018 conference. An enhanced version of the game was released on Xbox Series X/S on 10 November 2020','79.90','PC','2018','2021-01-03 08:45:18'),(55,'the testing game','fuck','90000','PC','1999','2021-02-02 07:59:55'),(79,'I love BED','I love MR TAN','999,999,999','xbox','2020','2021-02-02 14:50:20'),(80,'I love Mr Tan','I love BED','999,999,999','playstation','2021','2021-02-02 14:51:30'),(81,'Testing 123','Fuck u','1234567890','Xbox','1999','2021-02-07 09:43:46'),(82,'F88k','This is a testing game','1000','PlayStation','2020','2021-02-07 12:12:11'),(83,'fasdfajd','fadfafa','34567890','PC','2021','2021-02-07 12:17:42');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `gameid` int NOT NULL,
  `content` text NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `gameid_idx` (`gameid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `gameid` FOREIGN KEY (`gameid`) REFERENCES `games` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (11,38,2,'I love to play this game!',9,'2021-02-01 05:53:03'),(12,38,3,'I love to play this game!',8,'2021-02-01 05:53:10'),(13,38,6,'I love to play this game!',8,'2021-02-01 05:53:19'),(14,39,5,'This game is just so good',8,'2021-02-01 05:53:56'),(15,39,4,'Cyberpunk is just bad',3,'2021-02-01 05:54:30'),(16,38,4,'The game is just not ready for sale',1,'2021-02-01 05:55:12'),(17,38,1,'I love this game',10,'2021-02-01 05:56:02'),(25,40,55,'this game is shit',1,'2021-02-02 08:00:13'),(26,40,55,'This is Shi Tingxiao, my code is just so damm messy and I haven\'t started on my other projects, my life is just fucked',1,'2021-02-02 13:39:01'),(27,38,80,'100 out of 10, please Mr Tan, need marks\r\n',100,'2021-02-02 15:19:32'),(28,39,55,'This game is just so good that i don\'t even have a word for it\r\n',10,'2021-02-07 07:07:54'),(29,40,81,'fjadfad',1,'2021-02-07 09:44:36'),(30,40,81,'Fuckyou ',234567890,'2021-02-07 09:44:50'),(31,39,1,'I also love this game\r\n',10,'2021-02-07 13:32:31');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'customer',
  `profile_pic_url` varchar(255) NOT NULL DEFAULT 'user_image/default.jpg',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`,`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (38,'Shi Tingxiao','shitingxiaotony@gmail.com','$2b$10$38e8VdHVaDDeR7KezV30YuV.woyc7j7E2pzWW1cXj8a2RfoYTWcxy','customer','user_image/user38.jpg','2021-01-27 03:25:59'),(39,'ting','stx6@outlook.com','$2b$10$JqJA17TwlAyigPvDohBsdu1Hir.zw.FEBBWiI5MfuSzjfoaFZS3vG','customer','user_image/user39.jpg','2021-01-28 08:01:15'),(40,'admin','admin@spgames.com','$2b$10$LWyN6eBSptE.w3wELkXnZ.W7.62zVkvyE4o.GyOa9rBSD4gnIvg/e','admin','user_image/user40.jpg','2021-01-29 03:22:16');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-07 22:29:36
