<?php
	$db = mysqli_connect("localhost", "root", "", "capos");

    /* werte übernehmen */
    $id = $_POST["id"];

	$stmt = "update locations set `Likes` = `Likes`+1 where `id` = '$id'";
	$eintragen = mysqli_query($db, $stmt);
?>