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
	var locationTypeSelector = document.getElementById("locationTypeSelector");
	var oeffnungszeitLabel = document.getElementById("oeffnungszeit");
	// need to create db entry in locations
	var locationName = nameInput.value;
	var location = place.geometry.location;
	var type = locationTypeSelector.value;
	var offnungszeit = oeffnungszeit.value;
	console.log("name " + locationName + " loction " + location + " Typ " + type + " offnungszeit " + offnungszeit);
	showUser(nameInput);
}

function showUser(str)
{
	$.ajax({
        type: "POST",
        url: "js/databaseAccess.php",
        dataType: "json",
        success: function(){
             console.log("accessed db");
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

    