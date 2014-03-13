<?php
	include("include/dbconnect.php");

	$id = $_POST['id'];

	$loeschen = "DELETE FROM eintraege WHERE id = '$id'";

	$loesch = mysqli_query($db, $loeschen);

?>