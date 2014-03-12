var map;
var myGeoLoaction;
function initialize() {

	// init google maps
	var mapOptions = {
			center: new google.maps.LatLng(60, 105),
			zoom: 14
		};
		
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
	//find my location and set marker to it
	markCurrentLocation();
	
	//foreach location in database
	var lgn = new google.maps.LatLng(48.400884, 9.991201000000046);
	createMarker(lgn);
}

function markCurrentLocation()
{
	if (navigator.geolocation)
	{
		console.log("try to get location");
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else{console.log("Geolocation is not supported by this browser.");}
}

function showPosition(position)
{
	console.log("show position: " + position.coords.latitude + "," + position.coords.longitude);
	var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.setCenter(myPos);
	createMarker(myPos);
}

function createMarker(latLng){
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
	     //show event details page
	     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
	  });
}

function createCurrentPosMarker(latLng){
	var image = 'homer_simpson_on_a_chair.jpg';
	
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		icon:image,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
	     //show event details page
	     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
	  });
}

google.maps.event.addDomListener(window, 'load', initialize);

    