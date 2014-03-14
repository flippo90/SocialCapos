var autocomplete;

function initialize() {
	var input = (document.getElementById('adresse'));
	autocomplete = new google.maps.places.Autocomplete(input);

	var infowindow = new google.maps.InfoWindow();
}

function onCreateLocation(){
	// mit diesen werten soll ein Eintrag in die tabelle locations eingefÃ¼gt werden
	var locationName = document.getElementById("nameInput").value;
	var location = autocomplete.getPlace().geometry.location;
	var type = document.getElementById("locationTypeSelector").value;
	var offnungszeit = document.getElementById("oeffnungszeit").value;
	
	console.log("name " + locationName + " loction " + location + " Typ " + type + " offnungszeit " + offnungszeit);
	 $.ajax({
         type: "POST",
         url: "php/save.php",
         data: "locationName=" + locationName + "&geoLocation=" + location + "&type=" + type + "&openingHours=" + offnungszeit,
         success: function(msg)
         {
             /* form-div verstecken, seite nachladen & wieder einblenden (2000 ms) */
             //$("#myFormDiv").hide().load("message.html").fadeIn(2000);
             console.log('erfolgreich hinzugefügt');
         }
     });
}

google.maps.event.addDomListener(window, 'load', initialize);

    