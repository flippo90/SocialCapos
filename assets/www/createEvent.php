
<!DOCTYPE html>
<html>
  	<head>
    	<title>Event erstellen</title>
	</head>
  	<body>
	  	<a href="index.html"> <img src="img/backarrow.png" width="30" height="30" border="0" alt="zur&uuml;ck"> </a>
	  	<hr>
	  	<br />
		<input id="nameInput" class="controls" type="text" placeholder="Name des Events">
		<br />
		<input id="descriptionInput" class="controls" type="text" placeholder="Beschreibung des Events">
		<br />
		<input id="specialsInput" class="controls" type="text" placeholder="Specials">
		<br />
		<input id="dateInput" class="controls" type="text" placeholder="Datum">
		<br />
		<input type = "radio"
	         name = "turnus"
	         id = "weekly"
	         value = "weekly"/>
        <label for = "weekly">Woechentlich</label>
          
        <input type = "radio"
	         name = "turnus"
	         id = "monthly"
	         value = "monthly" />
        <label for = "monthly">Monatlich</label>
        <br />         
		<select id="locationTypeSelector">
			<?php
				$db = mysqli_connect("localhost", "root", "", "capos");
							
				$ergebnis = mysqli_query($db, "SELECT * FROM locations");
				while($row = mysqli_fetch_object($ergebnis))
				{
					echo ('<option value="'.$row->id.'">'.$row->Name.'</option>');
				}
		  	?>
		</select>
		<br />
		<button id="createLocationButton" onClick="onCreateLocation()">Location erstellen</button>
		<script type="text/javascript" charset="utf-8" src="js/createLocation.js"></script>
		<script language="JavaScript" type="text/javascript" src="js/jquery-2.1.0.js"></script>
	</body>
</html>