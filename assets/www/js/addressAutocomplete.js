var autocomplete;

function initialize() {
	var input = /** @type {HTMLInputElement} */(
      document.getElementById('adresse'));
	autocomplete = new google.maps.places.Autocomplete(input);

	var infowindow = new google.maps.InfoWindow();
}

function onCreateLocation(){
	var place = autocomplete.getPlace();
	var nameInput = document.getElementById("nameInput");
	//fill the locationTypeSelector dropdown with the entries from 'art' table
	//var locationTypeSelector = document.getElementById("locationTypeSelector");
	var oeffnungszeitLabel = document.getElementById("oeffnungszeit");
	// mit diesen werten soll ein Eintrag in die tabelle locations eingefügt werden
	var locationName = nameInput.value;
	var location = place.geometry.location;
	//var type = locationTypeSelector.value;
	var offnungszeit = oeffnungszeitLabel.value;
	var anzahlLikes = 0;
	console.log("name " + locationName + " loction " + location + /*" Typ " + type +*/ " offnungszeit " + offnungszeit);
}

google.maps.event.addDomListener(window, 'load', initialize);

    