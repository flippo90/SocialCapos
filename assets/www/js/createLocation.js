var autocomplete;

function initialize() {
	var input = (document.getElementById('adresse'));
	autocomplete = new google.maps.places.Autocomplete(input);

	document.getElementById("successLabel").style.display = "none";
	}

function onCreateLocation(){
	document.getElementById("successLabel").style.display = "none";
	// mit diesen werten soll ein Eintrag in die tabelle locations eingefügt werden
	var locationName = document.getElementById("nameInput").value;
	var location = autocomplete.getPlace().geometry.location;
	var type = document.getElementById("locationTypeSelector").value;
	var offnungszeit = document.getElementById("oeffnungszeit").value;
	var address = autocomplete.getPlace().formatted_address
	console.log("name " + locationName + " loction " + location + " Typ " + type + " offnungszeit " + offnungszeit + " address" + address);
	 $.ajax({
         type: "POST",
         url: "php/save.php",
         data: "locationName=" + locationName + "&geoLocation=" + location + "&type=" + type + "&openingHours=" + offnungszeit+ "&address=" + address,
         success: function(msg)
         {
             /* form-div verstecken, seite nachladen & wieder einblenden (2000 ms) */
             //$("#myFormDiv").hide().load("message.html").fadeIn(2000);
             document.getElementById("successLabel").style.display = "inline";
         }
     });
}

google.maps.event.addDomListener(window, 'load', initialize);

    