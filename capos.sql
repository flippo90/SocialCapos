-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 11. Apr 2014 um 18:00
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=238 ;

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
(142, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-03-31', '10-24', 0, 20),
(143, 'zur forelle', 'zur forelle', 'zur forelle', '2014-04-05', '22-23', 0, 4),
(144, 'capos', 'capos', 'capos', '2014-04-05', '21-21', 0, 3),
(145, 'tortuga', 'tortuga', 'tortuga', '2014-04-05', '5-7', 0, 7),
(146, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-04-05', '22-8', 0, 2),
(147, 'theatro', 'theatro', 'theatro', '2014-04-05', '15-4', 0, 5),
(148, 'myers', 'myers', 'myers', '2014-04-05', '9-1', 0, 6),
(149, 'Theater', 'Theater', 'Theater', '2014-04-05', '14-9', 0, 8),
(150, 'choclet', 'choclet', 'choclet', '2014-04-05', '20-11', 0, 10),
(151, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-04-05', '24-12', 0, 9),
(152, 'citrus', 'citrus', 'citrus', '2014-04-05', '15-16', 0, 11),
(153, 'roxy', 'roxy', 'roxy', '2014-04-05', '2-23', 0, 12),
(154, 'wiley', 'wiley', 'wiley', '2014-04-05', '17-9', 0, 14),
(155, 'bla', 'bla', 'bla', '2014-04-05', '4-24', 0, 13),
(156, 'olga', 'olga', 'olga', '2014-04-05', '8-14', 0, 17),
(157, 'olga', 'olga', 'olga', '2014-04-05', '14-4', 0, 18),
(158, 'joes', 'joes', 'joes', '2014-04-05', '12-23', 0, 19),
(159, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-04-05', '14-14', 0, 20),
(160, 'schloessle', 'schloessle', 'schloessle', '2014-04-05', '11-20', 0, 15),
(161, 'olga', 'olga', 'olga', '2014-04-05', '10-1', 0, 16),
(162, 'zur forelle', 'zur forelle', 'zur forelle', '2014-04-07', '3-23', 0, 4),
(163, 'theatro', 'theatro', 'theatro', '2014-04-07', '14-14', 0, 5),
(164, 'myers', 'myers', 'myers', '2014-04-07', '1-3', 0, 6),
(165, 'capos', 'capos', 'capos', '2014-04-07', '16-12', 0, 3),
(166, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-04-07', '17-8', 0, 2),
(167, 'tortuga', 'tortuga', 'tortuga', '2014-04-07', '4-18', 0, 7),
(168, 'Theater', 'Theater', 'Theater', '2014-04-07', '15-21', 0, 8),
(169, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-04-07', '20-2', 0, 9),
(170, 'choclet', 'choclet', 'choclet', '2014-04-07', '17-15', 0, 10),
(171, 'roxy', 'roxy', 'roxy', '2014-04-07', '18-12', 0, 12),
(172, 'citrus', 'citrus', 'citrus', '2014-04-07', '22-6', 0, 11),
(173, 'bla', 'bla', 'bla', '2014-04-07', '24-24', 0, 13),
(174, 'wiley', 'wiley', 'wiley', '2014-04-07', '21-18', 0, 14),
(175, 'schloessle', 'schloessle', 'schloessle', '2014-04-07', '13-10', 0, 15),
(176, 'olga', 'olga', 'olga', '2014-04-07', '23-20', 0, 16),
(177, 'olga', 'olga', 'olga', '2014-04-07', '16-4', 0, 17),
(178, 'olga', 'olga', 'olga', '2014-04-07', '14-23', 0, 18),
(179, 'joes', 'joes', 'joes', '2014-04-07', '8-19', 0, 19),
(180, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-04-07', '2-4', 0, 20),
(181, 'capos', 'capos', 'capos', '2014-04-08', '15-15', 0, 3),
(182, 'myers', 'myers', 'myers', '2014-04-08', '16-22', 0, 6),
(183, 'zur forelle', 'zur forelle', 'zur forelle', '2014-04-08', '2-17', 0, 4),
(184, 'theatro', 'theatro', 'theatro', '2014-04-08', '23-17', 0, 5),
(185, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-04-08', '17-17', 0, 2),
(186, 'tortuga', 'tortuga', 'tortuga', '2014-04-08', '7-13', 0, 7),
(187, 'Theater', 'Theater', 'Theater', '2014-04-08', '19-6', 0, 8),
(188, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-04-08', '9-10', 0, 9),
(189, 'choclet', 'choclet', 'choclet', '2014-04-08', '20-4', 0, 10),
(190, 'citrus', 'citrus', 'citrus', '2014-04-08', '8-22', 0, 11),
(191, 'wiley', 'wiley', 'wiley', '2014-04-08', '14-6', 0, 14),
(192, 'roxy', 'roxy', 'roxy', '2014-04-08', '2-17', 0, 12),
(193, 'bla', 'bla', 'bla', '2014-04-08', '5-12', 0, 13),
(194, 'schloessle', 'schloessle', 'schloessle', '2014-04-08', '2-14', 0, 15),
(195, 'olga', 'olga', 'olga', '2014-04-08', '13-2', 0, 16),
(196, 'olga', 'olga', 'olga', '2014-04-08', '22-9', 0, 17),
(197, 'olga', 'olga', 'olga', '2014-04-08', '7-22', 0, 18),
(198, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-04-08', '20-8', 0, 20),
(199, 'joes', 'joes', 'joes', '2014-04-08', '4-13', 0, 19),
(200, 'theatro', 'theatro', 'theatro', '2014-04-09', '19-8', 0, 5),
(201, 'myers', 'myers', 'myers', '2014-04-09', '2-8', 0, 6),
(202, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-04-09', '12-14', 0, 2),
(203, 'capos', 'capos', 'capos', '2014-04-09', '15-11', 0, 3),
(204, 'zur forelle', 'zur forelle', 'zur forelle', '2014-04-09', '10-9', 0, 4),
(205, 'tortuga', 'tortuga', 'tortuga', '2014-04-09', '4-16', 0, 7),
(206, 'choclet', 'choclet', 'choclet', '2014-04-09', '7-13', 0, 10),
(207, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-04-09', '5-14', 0, 9),
(208, 'citrus', 'citrus', 'citrus', '2014-04-09', '6-21', 0, 11),
(209, 'Theater', 'Theater', 'Theater', '2014-04-09', '13-18', 0, 8),
(210, 'roxy', 'roxy', 'roxy', '2014-04-09', '18-14', 0, 12),
(211, 'wiley', 'wiley', 'wiley', '2014-04-09', '15-18', 0, 14),
(212, 'bla', 'bla', 'bla', '2014-04-09', '20-4', 0, 13),
(213, 'olga', 'olga', 'olga', '2014-04-09', '4-14', 0, 16),
(214, 'schloessle', 'schloessle', 'schloessle', '2014-04-09', '17-14', 0, 15),
(215, 'olga', 'olga', 'olga', '2014-04-09', '20-23', 0, 17),
(216, 'olga', 'olga', 'olga', '2014-04-09', '22-23', 0, 18),
(217, 'joes', 'joes', 'joes', '2014-04-09', '5-20', 0, 19),
(218, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-04-09', '1-4', 0, 20),
(219, 'theatro', 'theatro', 'theatro', '2014-04-10', '8-12', 0, 5),
(220, 'tortuga', 'tortuga', 'tortuga', '2014-04-10', '1-23', 0, 7),
(221, 'capos', 'capos', 'capos', '2014-04-10', '23-18', 0, 3),
(222, 'myers', 'myers', 'myers', '2014-04-10', '10-20', 0, 6),
(223, 'Barfuesser', 'Barfuesser', 'Barfuesser', '2014-04-10', '3-19', 0, 2),
(224, 'zur forelle', 'zur forelle', 'zur forelle', '2014-04-10', '16-5', 0, 4),
(225, 'Theater', 'Theater', 'Theater', '2014-04-10', '3-17', 0, 8),
(226, 'mÃ¼nster', 'mÃ¼nster', 'mÃ¼nster', '2014-04-10', '14-10', 0, 9),
(227, 'choclet', 'choclet', 'choclet', '2014-04-10', '13-13', 0, 10),
(228, 'citrus', 'citrus', 'citrus', '2014-04-10', '8-7', 0, 11),
(229, 'roxy', 'roxy', 'roxy', '2014-04-10', '11-1', 0, 12),
(230, 'bla', 'bla', 'bla', '2014-04-10', '12-6', 0, 13),
(231, 'wiley', 'wiley', 'wiley', '2014-04-10', '23-3', 0, 14),
(232, 'schloessle', 'schloessle', 'schloessle', '2014-04-10', '23-20', 0, 15),
(233, 'olga', 'olga', 'olga', '2014-04-10', '5-7', 0, 16),
(234, 'olga', 'olga', 'olga', '2014-04-10', '19-5', 0, 17),
(235, 'olga', 'olga', 'olga', '2014-04-10', '19-6', 0, 18),
(236, 'joes', 'joes', 'joes', '2014-04-10', '16-17', 0, 19),
(237, 'cinemaxx', 'cinemaxx', 'cinemaxx', '2014-04-10', '14-10', 0, 20);

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
