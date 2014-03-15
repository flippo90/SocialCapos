
<!DOCTYPE html>
<html>
  	<head>
    	<title>Event erstellen</title>
    	<link rel="stylesheet" type="text/css" href="css/style.css">	
		
    	<script type="text/javascript" charset="utf-8" src="js/createEvent.js"></script>
		<script language="JavaScript" type="text/javascript" src="js/jquery-2.1.0.js"></script>
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
		<input id="dateInput" class="controls" type="date" placeholder="Datum">
		<br />
		<input id="hoursInput" class="controls" type="text" placeholder="Uhrzeit">
		<br />
		<form>
      		<input type="radio" id="r1" name="r" value="0">Keine Wiederholung</input>
      		<input type="radio" id="r2" name="r" value="1">Woechentlich</input>
      		<input type="radio" id="r3" name="r" value="2">Monatlich</input>
      	</form>
		<select id="locationSelector">
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
		<button id="createEventButton" onClick="onCreateEvent()">Event erstellen</button>
		<br/>
		<label id="successLabel" style="display:none">Event erfolgreich in DB gespeichert</label>
	</body>
</html>