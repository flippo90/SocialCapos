<?php	
	$db = mysqli_connect("localhost", "root", "", "capos");
	 if(!$db)
	{
	  exit("Verbindungsfehler: ".mysqli_connect_error());
	}
?>