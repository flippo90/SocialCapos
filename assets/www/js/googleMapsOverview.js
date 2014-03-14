var map;
var myGeoLoaction;
var searchedType
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
	setAllLocationEntriesToMap();
}

function setAllLocationEntriesToMap(){
	$.ajax({
        type: "GET",
        url: "php/getAllLocations.php",
        dataType: "json",

        success: function(result){
        	for (var loc in result.geoLocations){
        		createMarkerIfFitsInFilter(result.types[loc], result.geoLocations[loc].slice(1));
            }
        }
    })
}

function createMarkerIfFitsInFilter(type, geoLocation){
	searchedType = window.location.hash.slice(1);
	console.log("compare: " + type + " == " + searchedType);
	console.log(type == searchedType);
	if(type == searchedType){
		console.log("after string compare");
		var latLgn = getPointFromString(geoLocation);
		createMarker(latLgn);
	}
}

function getPointFromString(str){
	var bits = str.split(/,\s*/);
	point = new google.maps.LatLng(parseFloat(bits[0]),parseFloat(bits[1]));
	return point;
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

    