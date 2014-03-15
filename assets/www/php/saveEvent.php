<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    $name = $_POST["name"];
    $descirption = $_POST["descirption"];
    $specials = $_POST["specials"];
    $date = $_POST["date"];
    $hours = $_POST["hours"];
    $turnus = $_POST["turnus"];
    $location = $_POST["location"];
    
    /* weiterverarbeitung der variablen/daten*/ 
	/*$stmt = "INSERT INTO events (Name, Description, Specials, Date, Uhrzeit, Turnus, Location) VALUES ('$name', '$descirption', '$specials', '$date', '$hours', '$turnus', '$location')";
	*/
	$stmt = "INSERT INTO `events`(`Id`, `Name`, `Description`, `Specials`, `Date`, `Uhrzeit`, `Turnus`, `Location`) VALUES (0, '$name', '$descirption', '$specials', '$date', '$hours', '$turnus', '$location')";
	$eintragen = mysqli_query($db, $stmt);
?>