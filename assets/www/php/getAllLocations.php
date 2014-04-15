<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

	$ergebnis = mysqli_query($db, "SELECT * FROM locations");
	
	$resultArray = array(); 		
	$typesArray = array();
	$idArray = array();
	$nameArray = array();
	$openingHoursArray = array();
	$likesArray = array();
	$addressArray = array();	
	
	while($row = mysqli_fetch_array($ergebnis)){
	     $resultArray[] = $row['GeoLocation'];
	     $typesArray[] = $row['Art']; 
	     $idArray[] = $row['Id'];
	     $nameArray[] = $row['Name'];
	     $openingHoursArray[] = $row['Oeffnungszeiten']; 
	     $addressArray[] = $row['Adresse'];
	     $likesArray[] = $row['Likes'];	
	}

	echo json_encode( array( 
	    "geoLocations" =>  $resultArray,
	    "types" => $typesArray,
	    "id" => $idArray,
	    "names" => $nameArray,
	    "openingHours" => $openingHoursArray, 
	    "likes" => $likesArray,
	    "address" => $addressArray,	    
	    ) 
	);
?>