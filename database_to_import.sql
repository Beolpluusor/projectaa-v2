-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2026 at 03:05 PM
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
(6, 'Beolpluusor', 0, 1338, NULL),
(12, 'Beolpluusor', 532, 532, 6),
(13, 'Beolpluusor', 396, 396, 6),
(14, 'just', 593, 593, 6),
(15, 'just', 674, 674, 6),
(16, 'just', 871, 871, 6),
(17, 'just', 875, 875, 6),
(18, 'just', 801, 801, 6),
(19, 'just', 302, 302, 6),
(20, 'just', 653, 653, 6),
(21, 'shadisti', 350, 350, 6),
(22, 'shadisti', 288, 288, 6),
(23, 'shadisti', 310, 310, 6),
(24, 'shadisti', 289, 289, 6),
(25, 'shadisti', 433, 433, 6),
(26, 'halifax', 393, 393, 6),
(27, 'halifax', 355, 355, 6),
(28, 'halifax', 361, 361, 6),
(29, 'halifax', 319, 319, 6),
(30, 'halifax', 519, 519, 6),
(31, 'halifax', 2546, 2546, 6),
(32, 'Beolpluusor', 0, 0, 6),
(33, 'Beolpluusor', 0.424, 0, 6),
(34, 'Beolpluusor', 0.415, 0.415, 6);

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
  MODIFY `ID_GAME` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `gamtitle`
--
ALTER TABLE `gamtitle`
  MODIFY `GAMEID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
