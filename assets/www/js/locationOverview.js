var mapOptions = {
	center: new google.maps.LatLng(48.400884, 9.991201000000046/*get my geo location*/),
	zoom: 15
};

var map;

function initialize() {

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	//foreach location in database
		var lgn = new google.maps.LatLng(48.400884, 9.991201000000046);
		createMarker(lgn);
}

function createMarker(latLng){
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

    