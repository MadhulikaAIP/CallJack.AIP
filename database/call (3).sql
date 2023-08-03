-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 04:21 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `call`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `senderId`, `receiverId`, `message`, `timestamp`) VALUES
(71, 25, 24, 'hellllooo', '2023-07-04 12:24:26'),
(72, 24, 25, 'yes', '2023-07-04 12:25:13'),
(73, 25, 0, 'hello', '2023-07-04 12:31:43'),
(74, 25, 0, 'hello', '2023-07-04 12:31:49'),
(75, 25, 0, 'ok', '2023-07-04 12:31:52'),
(76, 25, 24, 'can you please let me know about job', '2023-07-05 19:27:33'),
(77, 24, 25, 'whatsapp', '2023-07-05 19:28:52'),
(78, 32, 28, 'hello', '2023-07-05 20:16:39'),
(79, 32, 28, 'hello', '2023-07-05 20:16:46'),
(80, 32, 32, 'hello', '2023-07-17 14:07:32'),
(81, 32, 27, 'can i know about the job', '2023-07-17 14:07:42'),
(82, 27, 32, 'yes ill let you know', '2023-07-17 14:10:20'),
(83, 27, 32, 'yes please', '2023-07-17 14:10:32'),
(84, 32, 27, 'hello', '2023-07-17 17:25:29'),
(85, 32, 28, 'yes', '2023-07-17 17:25:52'),
(86, 32, 28, 'hello', '2023-07-18 16:53:49'),
(87, 27, 32, 'hello', '2023-07-19 03:52:16'),
(88, 27, 32, 'hello', '2023-07-19 03:55:28'),
(89, 32, 27, 'not alll', '2023-07-19 03:57:18'),
(90, 27, 32, 'ok sir', '2023-07-19 04:15:45'),
(91, 32, 27, 'yes sir', '2023-07-19 09:26:29'),
(92, 27, 32, 'tell me', '2023-07-19 09:30:50');

-- --------------------------------------------------------

--
-- Table structure for table `contractors`
--

CREATE TABLE `contractors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `contractorId` int(11) DEFAULT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `paymentStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `job_posts`
--

CREATE TABLE `job_posts` (
  `id` int(11) NOT NULL,
  `ownerId` int(255) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` text DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `timePeriod` varchar(255) DEFAULT NULL,
  `cost` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `contractorId` varchar(11) NOT NULL,
  `Pay` varchar(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_posts`
--

INSERT INTO `job_posts` (`id`, `ownerId`, `jobTitle`, `jobDescription`, `capacity`, `timePeriod`, `cost`, `location`, `pincode`, `state`, `country`, `status`, `contractorId`, `Pay`) VALUES
(71, 24, 'building', 'building', 'building', 'building', 'building', 'building', '20000', 'eng', 'endd', 'accepted', '25', ''),
(72, 24, 'building', 'building', 'building', 'building', 'building', 'building', '20000', 'eng', 'endd', 'accepted', '25', ''),
(73, 24, 'house', '3bhk', '300sqft', '3 months', '$4000', 'lov', '900000', 'locc', 'locc', 'accepted', '25', ''),
(74, 24, 'house', '3bhk', '300sqft', '3 months', '$4000', 'lov', '900000', 'locc', 'locc', 'available', '25', ''),
(75, 24, 'house ', '1bhk house', '400sqft', '2 months', '$40000', 'hyd', '600000', 'hyd', 'hyd', 'available', '', ''),
(76, 28, 'house`', 'house`', '3000sqft', '2 months', '40000', 'usa', '80000', 'usa', 'usa', 'accepted', '32', ''),
(77, 32, '3 stair building', 'its a 3 stair buildingq', '4 sq ft', '3 months', '$400000', 'usa', 'usa', 'usa', 'usa', 'available', '32', ''),
(78, 27, 'new', 'new', '333', '333', '333', 'sdbv', 'gsufwu', 'isugf', 'fgfiuegi', 'accepted', '32', 'successful'),
(79, 27, 'newwq`1`', 'qq', 'q', 'q', 'q', 'q', 'q', 'q', 'q', 'accepted', '32', ''),
(80, 27, 'hhh', 'hhhh', 'hhhh', 'hhhhh', '777', 'uju', 'uuuuu', 'uuuu', 'uuuu', 'available', '33', '');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `contractorId` int(11) DEFAULT NULL,
  `jobId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `paymentStatus` varchar(255) DEFAULT NULL,
  `transactionId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `ownerId`, `contractorId`, `jobId`, `title`, `cost`, `paymentStatus`, `transactionId`) VALUES
(1, 27, 32, 78, 'new', '333.00', 'successful', 'pi_3NVI6tSCTPDkRA5G0vhaP8CJ'),
(2, 27, 32, 78, 'new', '333.00', 'successful', 'pi_3NVIORSCTPDkRA5G0yhSoE2k'),
(3, 27, 32, 78, 'new', '333.00', 'successful', 'pi_3NVIULSCTPDkRA5G01Wwf1PJ'),
(4, 27, 32, 78, 'new', '333.00', 'successful', 'pi_3NVIVRSCTPDkRA5G18663cxH'),
(5, 27, 32, 78, 'new', '333.00', 'successful', 'pi_3NVIpkSCTPDkRA5G09lyuU8P');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `social_media_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social_media_links`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `contractor_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userId` int(222) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('admin','contractor','owner') NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `reputation` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `field_of_work` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `username`, `password`, `email`, `role`, `phone_number`, `experience`, `reputation`, `bio`, `field_of_work`) VALUES
(27, 0, 'Raju', '$2b$10$PnOQdeGqxEG8ZTkStdVQJuT8UPMy9H/eBxyjkYF8C2d52a3FWoSey', 'raju@gmail.com', 'owner', NULL, NULL, NULL, NULL, NULL),
(28, 0, 'Abhi', '$2b$10$MWF70ibI9kNOA.eT305OOOywLs8trX7qGI2n2iQDID0XPFID1/EVm', 'abhi@gmail.com', 'owner', NULL, NULL, NULL, NULL, NULL),
(29, 0, 'pavan teja', '$2b$10$DNjHHooQEhjeSmG3h5yqiOhljrtoMXOfkpuX31HeOB7f7FNBnw80a', 'pavanteja@gmail.com', 'owner', NULL, NULL, NULL, NULL, NULL),
(30, 0, 'Rama', '$2b$10$zNvKtD.f4TNW5gRP/d/UR..0XZMNJsnZPECWoRoGqGdoQ9KmvBJKi', 'rama@gmail.com', 'owner', NULL, NULL, NULL, NULL, NULL),
(31, 0, 'Madhulika', '$2b$10$JZ63IsIwQXXQZkw/HMKote0PIB2VKYE96iREQV7UIBi4O2FFp7liu', 'madhulika@gmail.com', 'owner', NULL, NULL, NULL, NULL, NULL),
(32, 0, 'Pavan', '$2b$10$6DZOQdLLemucfVs1M2dBBexpN1UVXctODrADOawG5JdG9izVhlv8O', 'pavan@gmail.com', 'contractor', NULL, NULL, NULL, NULL, NULL),
(33, 0, 'vakula', '$2b$10$xK12itleIDgqdmgRlXrLEeL7iKn1C5BxMUj2kbf1ZmURHuJjdzm/W', 'vakula@gmail.com', 'contractor', NULL, NULL, NULL, NULL, NULL),
(34, 0, 'vedath', '$2b$10$PsEORkQ.UipJlOwFCCWlyuOXn5UyIaM.s3G8rmCtmSxpiAJH9Dgya', 'vedath@gmail.com', 'contractor', NULL, NULL, NULL, NULL, NULL),
(35, 0, 'tej', '$2b$10$XJmfaCy3C03GdhES/Y10V.iq5IsjhdelL8QBI5esuWt2fxe/i0ZG2', 'tej@gmail.com', 'contractor', '90000000098', '4 years', '400 per hour', 'im a skilled constructor for all buildings ', 'construction of buildings'),
(36, 0, 'tejaaa', '$2b$10$hcpvlf2Oos4CKJKwaAf4Xu7AcL2NPJ9ZIXiWjiRiyMFjaO8coObxK', 'vij@gmail.com', 'contractor', '90000000098', '4 years', '400 per hour', 'im a skilled constructor for all buildings ', 'construction of buildings'),
(37, 0, 'sai', '$2b$10$I7vH1ua8SrsokduJ6raDk.dnXRqcUQ2ZmxYflHgszOhZYAAe5idqa', 'sai@gmail.com', 'contractor', '90000000098', '4 years', '500per hour', 'im a skilled constructor for all buildings ', 'construction of buildings'),
(38, 0, 'vijay', '$2b$10$s2RO64itLa8ihFsk.zATOu6lL1KZk7NMsz1.IyYYxgF4usyiimLU.', 'vijay@gmail.com', 'contractor', '90000012311', '5 years', '500 for hour', 'im a skilled painter', 'painting'),
(39, 0, 'name', '$2b$10$JvEP5aIM5siULP5Tngd41u8fsTkzKaLw0uwYg2Vrk5lEsP1cK/6Um', 'name@gmail.com', 'contractor', '9213562789', '8 yeqrs', '600 per hour', 'im a skilled architect', 'architecture');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contractors`
--
ALTER TABLE `contractors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_owner` (`ownerId`),
  ADD KEY `fk_contractor` (`contractorId`);

--
-- Indexes for table `job_posts`
--
ALTER TABLE `job_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `contractor_id` (`contractor_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `contractors`
--
ALTER TABLE `contractors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_posts`
--
ALTER TABLE `job_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contractors`
--
ALTER TABLE `contractors`
  ADD CONSTRAINT `contractors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_contractor` FOREIGN KEY (`contractorId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`);

--
-- Constraints for table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `owners_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`contractor_id`) REFERENCES `contractors` (`id`),
  ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
