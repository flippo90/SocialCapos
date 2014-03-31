-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 31. Mrz 2014 um 21:22
-- Server Version: 5.6.16
-- PHP-Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `capos`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `art`
--

CREATE TABLE IF NOT EXISTS `art` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Daten für Tabelle `art`
--

INSERT INTO `art` (`id`, `Name`) VALUES
(1, 'Restaurant'),
(2, 'Bar'),
(3, 'Club'),
(4, 'Sonstiges');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `eintraege`
--

CREATE TABLE IF NOT EXISTS `eintraege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `eintraege`
--

INSERT INTO `eintraege` (`id`, `bezeichnung`) VALUES
(1, 'Bierhaus 11');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Specials` varchar(200) NOT NULL,
  `Date` date NOT NULL,
  `Uhrzeit` varchar(30) NOT NULL,
  `Turnus` int(1) NOT NULL,
  `Location` int(5) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=143 ;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`Id`, `Name`, `Description`, `Specials`, `Date`, `Uhrzeit`, `Turnus`, `Location`) VALUES
(3, 'Tortuga Happy Hour', 'Happy Hour', '2 Coktails zum Pries von einem', '2014-03-27', '20-22', 1, 7),
(4, 'happy hout', 'bla', 'jumbo 5 euro', '2014-03-26', '20-22', 1, 10),
(5, 'mein event', 'happy hour', 'coole party', '2014-03-29', '8-12', 1, 5),
(6, 'Tortuga Happy Hour', 'Happy Hour', '2 Coktails zum Pries von einem', '2014-03-27', '20-22', 1, 4),
(7, 'Tortuga Happy Hour', 'Happy Hour', '2 Coktails zum Pries von einem', '2014-03-17', '20-22', 1, 11),
(8, 'mein event', 'happy hour', 'coole party', '2014-03-27', '8-12', 1, 12),
(124, 'theatro', 'theatro', 'theatro', '2014-03-31', '24-11', 0, 5),
(125, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-03-31', '7-4', 0, 2),
(126, 'myers', 'myers', 'myers', '2014-03-31', '8-3', 0, 6),
(127, 'tortuga', 'tortuga', 'tortuga', '2014-03-31', '18-19', 0, 7),
(128, 'zur forelle', 'zur forelle', 'zur forelle', '2014-03-31', '1-8', 0, 4),
(129, 'capos', 'capos', 'capos', '2014-03-31', '10-13', 0, 3),
(130, 'Theater', 'Theater', 'Theater', '2014-03-31', '19-22', 0, 8),
(131, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-03-31', '16-11', 0, 9),
(132, 'citrus', 'citrus', 'citrus', '2014-03-31', '12-13', 0, 11),
(133, 'choclet', 'choclet', 'choclet', '2014-03-31', '11-14', 0, 10),
(134, 'bla', 'bla', 'bla', '2014-03-31', '21-17', 0, 13),
(135, 'roxy', 'roxy', 'roxy', '2014-03-31', '5-22', 0, 12),
(136, 'wiley', 'wiley', 'wiley', '2014-03-31', '5-17', 0, 14),
(137, 'schloessle', 'schloessle', 'schloessle', '2014-03-31', '19-7', 0, 15),
(138, 'olga', 'olga', 'olga', '2014-03-31', '18-20', 0, 16),
(139, 'olga', 'olga', 'olga', '2014-03-31', '6-5', 0, 18),
(140, 'joes', 'joes', 'joes', '2014-03-31', '5-11', 0, 19),
(141, 'olga', 'olga', 'olga', '2014-03-31', '9-5', 0, 17),
(142, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-03-31', '10-24', 0, 20);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `Name` varchar(60) NOT NULL,
  `GeoLocation` varchar(20) NOT NULL,
  `Oeffnungszeiten` varchar(20) NOT NULL,
  `Art` int(20) NOT NULL,
  `Likes` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Daten für Tabelle `locations`
--

INSERT INTO `locations` (`id`, `Name`, `GeoLocation`, `Oeffnungszeiten`, `Art`, `Likes`) VALUES
(2, 'Barfuesser', '(48.396754, 9.989834', '8-12', 2, 0),
(3, 'capos', '(48.400884, 9.991201', '8-10', 2, 0),
(4, 'zur forelle', '(48.395323, 9.990409', '9-13', 1, 0),
(5, 'theatro', '(48.3991, 9.98946000', '2-3', 3, 0),
(6, 'myers', '(48.397813, 9.989723', '1-2', 3, 0),
(7, 'tortuga', '(48.397021, 9.995180', '5-4', 2, 0),
(8, 'Theater', '(48.401057, 9.986697', '12-14', 4, 0),
(9, 'mÃ¼nster', '(48.398523, 9.992555', '8', 4, 0),
(10, 'choclet', '(48.396278, 9.994727', '8-12', 2, 0),
(11, 'citrus', '(48.399877, 9.996631', '1-3', 3, 0),
(12, 'roxy', '(48.391555, 9.985777', '12-24', 4, 0),
(13, 'bla', '(48.39857, 10.006020', '10-12', 2, 0),
(14, 'wiley', '(48.38059, 10.007182', '12-14', 3, 0),
(15, 'schloessle', '(48.403182, 10.02031', '14-16', 1, 0),
(16, 'olga', '(48.4018318, 9.99241', '16-18', 2, 0),
(17, 'olga', '(51.494149, 9.601675', '20-22', 2, 0),
(18, 'olga', '(48.41939, 9.8987899', '22-24', 4, 0),
(19, 'joes', '(51.315432, 9.479607', '1-3', 4, 0),
(20, 'cinemaxx', '(51.537053, 9.923545', '3-5', 4, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
