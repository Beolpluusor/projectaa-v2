DROP DATABASE IF EXISTS projectaa;
CREATE DATABASE projectaa CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci;
USE projectaa;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Taulujen poisto varmuuden vuoksi
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS gamtitle;
DROP TABLE IF EXISTS users;

-- Taulut

CREATE TABLE `game` (
  `ID_GAME` int(11) NOT NULL,
  `PLAYERNAME` varchar(50) DEFAULT NULL,
  `PLAYERSCORE` int(11) DEFAULT NULL,
  `GAMETIME` int(11) DEFAULT NULL,
  `GAMEID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

INSERT INTO `game` (`ID_GAME`, `PLAYERNAME`, `PLAYERSCORE`, `GAMETIME`, `GAMEID`) VALUES
(6, 'Beolpluusor', NULL, 1338, NULL),
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
(31, 'halifax', 2546, 2546, 6);

CREATE TABLE `gamtitle` (
  `GAMEID` int(11) NOT NULL,
  `GAMENAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

INSERT INTO `gamtitle` (`GAMEID`, `GAMENAME`) VALUES
(1, 'SNAKE'),
(2, 'WORDGAME'),
(3, 'SHOOTER'),
(4, 'SPACESHOOTER'),
(5, 'JUMPER'),
(6, 'ReactionGame');

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `PLAYER_TAG` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

INSERT INTO `users` (`id`, `username`, `PASSWORD`, `PLAYER_TAG`) VALUES
(18, 'arttu', '$2b$10$GoX67aBaWignlQ0e421GKu7l.XRikmbVFDHhiVtvtxagSXpwlE0IK', 'Beolpluusor'),
(21, 'testiteppo', '$2b$10$Ji4vKCmHuqspXANv3MN5zurZjQnu0BP4P.i8rsjosboWtwkbKnis.', 'just'),
(22, 'pera', '$2b$10$NITya5VxSHcLj9P1j6ObPuvoiEWUelnvv0jqvV26Vk42D1qJX2WVi', 'shadisti'),
(23, 'proplayer', '$2b$10$7Lzs7RN2x1DLGSmxm8DamenXKbiTKRmEc2y6AUFMoL3zjMzIMz.jK', 'halifax');

-- Indexit

ALTER TABLE `game`
  ADD PRIMARY KEY (`ID_GAME`),
  ADD KEY `fk_game_gameid` (`GAMEID`);

ALTER TABLE `gamtitle`
  ADD PRIMARY KEY (`GAMEID`);

ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

-- AUTO_INCREMENT

ALTER TABLE `game`
  MODIFY `ID_GAME` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

ALTER TABLE `gamtitle`
  MODIFY `GAMEID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

-- Foreign keys

ALTER TABLE `game`
  ADD CONSTRAINT `fk_game_gameid` FOREIGN KEY (`GAMEID`) REFERENCES `gamtitle` (`GAMEID`);

ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`ID_GAME`);