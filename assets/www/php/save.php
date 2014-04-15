<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    $name = $_POST["locationName"];
    $geoLocation = $_POST["geoLocation"];
    $type = $_POST["type"];
    $openingHours = $_POST["openingHours"];
    $address = $_POST["address"];
    /* weiterverarbeitung der variablen/daten */
	$stmt = "INSERT INTO locations (Name, GeoLocation, Oeffnungszeiten, Art, Likes, Adresse) VALUES ('$name', '$geoLocation', '$openingHours', '$type', 0, '$address')";

	$eintragen = mysqli_query($db, $stmt);
?>