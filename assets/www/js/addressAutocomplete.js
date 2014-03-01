var autocomplete;

function initialize() {
	var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
	autocomplete = new google.maps.places.Autocomplete(input);

	var infowindow = new google.maps.InfoWindow();
}

function onCreateLocation(){
	var place = autocomplete.getPlace();
	var nameInput = document.getElementById("nameInput");
	// need to create db entry in locations
	console.log("create location with following name: " + nameInput.value + " and place: " + place.geometry.location);
}

google.maps.event.addDomListener(window, 'load', initialize);

    