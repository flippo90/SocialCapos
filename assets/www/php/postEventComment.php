<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    $eventId = $_POST["id"];
    $text = $_POST["text"];
    $writer = $_POST["writer"];
   	
	$stmt = "INSERT INTO `eventkommentare`(`EventId`, `Text`, `Writer`) VALUES ('$eventId','$text','$writer')";
	$eintragen = mysqli_query($db, $stmt);
?>