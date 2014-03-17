<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    
    /* weiterverarbeitung der variablen/daten*/ 
	$stmt = "SELECT `Id`, `Date`, `Uhrzeit`, `Location` FROM `events` ";
	
	$ergebnis = mysqli_query($db, $stmt);
	
	$idArray = array(); 		
	$dateArray = array();
	$timeArray = array();
	$locationIdArray = array();
	
	while($row = mysqli_fetch_array($ergebnis)){
	     $idArray[] = $row['Id'];
	     $dateArray[] = $row['Date']; 
	     $timeArray[] = $row['Uhrzeit'];
		$locationIdArray[] = $row['Location'];
	}

	echo json_encode( array( 
	    "idArray" =>  $idArray,
	    "dateArray" => $dateArray,
	    "timeArray" => $timeArray,
	    "locationIdArray" => $locationIdArray
	    ) 
	);
?>