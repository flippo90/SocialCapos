<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    $name = $_POST["locationName"];
    $geoLocation = $_POST["geoLocation"];
    $type = $_POST["type"];
    $openingHours = $_POST["openingHours"];
    
    /* weiterverarbeitung der variablen/daten */
	$stmt = "INSERT INTO locations (Name, GeoLocation, Oeffnungszeiten, Art, Likes) VALUES ('$name', '$geoLocation', '$openingHours', '$type', 0)";

	$eintragen = mysqli_query($db, $stmt);
?>