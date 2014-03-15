
<!DOCTYPE html>
<html>
  <head>
    <title>Place Autocomplete</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">	
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
		<script type="text/javascript" charset="utf-8" src="js/createLocation.js"></script>
		<script language="JavaScript" type="text/javascript" src="js/jquery-2.1.0.js"></script>
	</head>
  <body>
  <a href="index.html"> <img src="img/backarrow.png" width="30" height="30" border="0" alt="zur&uuml;ck"> </a>
  <hr>
  <br />
	<input id="nameInput" class="controls" type="text" placeholder="Name der Location">
	<br />
	<input id="adresse" class="controls" type="text" placeholder="Adresse eingeben">
	<br />
	<input id="oeffnungszeit" class="controls" type="text" placeholder="Öffnungszeit">
	<br />
	<select id="locationTypeSelector">
		<?php
			$db = mysqli_connect("localhost", "root", "", "capos");
						
			$ergebnis = mysqli_query($db, "SELECT * FROM art");
			while($row = mysqli_fetch_object($ergebnis))
			{
				echo ('<option value="'.$row->id.'">'.$row->Name.'</option>');
			}
	  	?>
	</select>
	<br />	
	<button id="createLocationButton" onClick="onCreateLocation()">Location erstellen</button>
	<br/>
	<label id="successLabel" visible="false">Location erfolgreich in DB gespeichert</label>
</body>
</html>