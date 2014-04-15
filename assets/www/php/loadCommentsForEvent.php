<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

	$id = $_GET["id"];		
	
	$commentIdArray = array(); 		
	$eventIdArray = array();
	$textArray = array();
	$writerArray = array();	
	
	$ergebnis = mysqli_query($db, "SELECT * FROM eventkommentare WHERE `EventId` = '$id' ORDER BY `Id` DESC");
	
	while($row = mysqli_fetch_array($ergebnis)){
	     $commentIdArray[] = $row['Id'];
	     $eventIdArray[] = $row['EventId']; 
	     $textArray[] = $row['Text'];
	     $nameArray[] = $row['Writer'];	
	}

	echo json_encode( array( 
	    "commentIds" =>  $commentIdArray,
	    "events" => $eventIdArray,
	    "texts" => $textArray,
	    "writers" => $writerArray,
	    ) 
	);
?>