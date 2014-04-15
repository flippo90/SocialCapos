<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    
    /* weiterverarbeitung der variablen/daten*/ 
	$stmt = "SELECT * FROM `events` ";
	
	$ergebnis = mysqli_query($db, $stmt);
	
	$idArray = array(); 		
	$dateArray = array();
	$timeArray = array();
	$locationIdArray = array();
	$nameArray = array(); 		
	$descriptionArray = array();
	$turnusArray = array();
	$specialsArray = array();
	$likesArray = array();
	$commentsArray = array();
	
	while($row = mysqli_fetch_array($ergebnis)){
	     $idArray[] = $row['Id'];
	     $dateArray[] = $row['Date']; 
	     $timeArray[] = $row['Uhrzeit'];
		$locationIdArray[] = $row['Location'];
		$nameArray[] = $row['Name'];
	     $descriptionArray[] = $row['Description']; 
	     $turnusArray[] = $row['Turnus'];
		$specialsArray[] = $row['Specials'];
		$likesArray[] = $row['Likes'];
		$commentsArray[] = $row['Kommentare'];
	}

	echo json_encode( array( 
	    "idArray" =>  $idArray,
	    "dateArray" => $dateArray,
	    "timeArray" => $timeArray,
	    "locationIdArray" => $locationIdArray,
	    "nameArray" => $nameArray,
	     "descriptionArray" => $descriptionArray,
	    "turnusArray" => $turnusArray,
		"specialsArray" => $specialsArray,
		"likesArray" => $likesArray,
		"commentsArray" => $commentsArray,
	    ) 
	);
?>