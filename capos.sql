-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Mrz 2014 um 18:40
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`Id`, `Name`, `Description`, `Specials`, `Date`, `Uhrzeit`, `Turnus`, `Location`) VALUES
(3, 'Tortuga Happy Hour', 'Happy Hour', '2 Coktails zum Pries von einem', '2014-03-14', '20-22', 1, 7),
(4, 'happy hout', 'bla', 'jumbo 5 euro', '2014-03-21', '20-22', 1, 10),
(5, 'mein event', 'happy hour', 'coole party', '2014-03-16', '8-12', 1, 5);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

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
(12, 'roxy', '(48.391555, 9.985777', '12-24', 4, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
