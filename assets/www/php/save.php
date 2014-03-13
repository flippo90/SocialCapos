<?php
	include("include/dbconnect.php");

    /* werte übernehmen */
    $bezeichnung = $_POST["exampleInputBezeichnung"];
    
    
    /* weiterverarbeitung der variablen/daten */
	$eintrag = "INSERT INTO eintraege (bezeichnung) VALUES ('$bezeichnung')";

	$eintragen = mysqli_query($db, $eintrag);
?>