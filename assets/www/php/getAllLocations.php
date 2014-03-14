<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

	$ergebnis = mysqli_query($db, "SELECT * FROM locations");
	$resultArray = array(); 		
	$typesArray = array();
	while($row = mysqli_fetch_array($ergebnis)){
	    //$resultArray[] = .$row->Name.
	     $resultArray[] = $row['GeoLocation'];
	     $typesArray[] = $row['Art'];  
	}

	echo json_encode( array( 
	    "geoLocations" =>  $resultArray,
	    "types" => $typesArray
	    ) 
	);
?>