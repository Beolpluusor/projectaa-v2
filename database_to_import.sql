-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2026 at 10:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectaa`
--

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `ID_GAME` int(11) NOT NULL,
  `PLAYERNAME` varchar(50) DEFAULT NULL,
  `PLAYERSCORE` float NOT NULL,
  `GAMETIME` float NOT NULL,
  `GAMEID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`ID_GAME`, `PLAYERNAME`, `PLAYERSCORE`, `GAMETIME`, `GAMEID`) VALUES
(49, 'Beolpluusor', 0.7, 0.7, 6),
(50, 'Beolpluusor', 0.451, 0.451, 6),
(51, 'Beolpluusor', 0.429, 0.429, 6),
(52, 'Beolpluusor', 10, 16, 1),
(53, 'Beolpluusor', 10, 16, 1),
(54, 'Beolpluusor', 2, 5, 1),
(55, 'Beolpluusor', 2, 5, 1),
(56, 'Beolpluusor', 3.109, 3.109, 6),
(57, 'Beolpluusor', 12, 21, 1),
(58, 'Beolpluusor', 12, 21, 1),
(59, 'Beolpluusor', 0.872, 0.872, 6),
(60, 'Beolpluusor', 9.762, 9.762, 6),
(61, 'Beolpluusor', 0, 2, 1),
(62, 'Beolpluusor', 0, 2, 1),
(63, 'Beolpluusor', 24, 37, 1),
(64, 'Beolpluusor', 24, 37, 1),
(65, 'just', 0.422, 0.422, 6),
(66, 'just', 0.382, 0.382, 6),
(67, 'just', 14, 22, 1),
(68, 'just', 14, 22, 1),
(69, 'halifax', 0.375, 0.375, 6),
(70, 'halifax', 0.381, 0.381, 6),
(71, 'halifax', 0.385, 0.385, 6),
(72, 'halifax', 0.43, 0.43, 6),
(73, 'halifax', 16, 24, 1),
(74, 'halifax', 16, 24, 1);

-- --------------------------------------------------------

--
-- Table structure for table `gamtitle`
--

CREATE TABLE `gamtitle` (
  `GAMEID` int(11) NOT NULL,
  `GAMENAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `gamtitle`
--

INSERT INTO `gamtitle` (`GAMEID`, `GAMENAME`) VALUES
(1, 'SNAKE'),
(2, 'WORDGAME'),
(3, 'SHOOTER'),
(4, 'SPACESHOOTER'),
(5, 'JUMPER'),
(6, 'ReactionGame');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user_id`, `game_id`) VALUES
(1, 18, 59),
(2, 18, 60),
(3, 18, 61),
(4, 18, 62),
(5, 18, 63),
(6, 18, 64),
(7, 21, 65),
(8, 21, 66),
(9, 21, 67),
(10, 21, 68),
(11, 23, 69),
(12, 23, 70),
(13, 23, 71),
(14, 23, 72),
(15, 23, 73),
(16, 23, 74);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `PLAYER_TAG` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `PASSWORD`, `PLAYER_TAG`) VALUES
(18, 'arttu', '$2b$10$GoX67aBaWignlQ0e421GKu7l.XRikmbVFDHhiVtvtxagSXpwlE0IK', 'Beolpluusor'),
(21, 'testiteppo', '$2b$10$Ji4vKCmHuqspXANv3MN5zurZjQnu0BP4P.i8rsjosboWtwkbKnis.', 'just'),
(22, 'pera', '$2b$10$NITya5VxSHcLj9P1j6ObPuvoiEWUelnvv0jqvV26Vk42D1qJX2WVi', 'shadisti'),
(23, 'proplayer', '$2b$10$7Lzs7RN2x1DLGSmxm8DamenXKbiTKRmEc2y6AUFMoL3zjMzIMz.jK', 'halifax');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`ID_GAME`),
  ADD KEY `fk_game_gameid` (`GAMEID`);

--
-- Indexes for table `gamtitle`
--
ALTER TABLE `gamtitle`
  ADD PRIMARY KEY (`GAMEID`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `ID_GAME` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `gamtitle`
--
ALTER TABLE `gamtitle`
  MODIFY `GAMEID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `fk_game_gameid` FOREIGN KEY (`GAMEID`) REFERENCES `gamtitle` (`GAMEID`);

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`ID_GAME`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
