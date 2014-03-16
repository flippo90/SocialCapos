var map;
var myGeoLoaction;
var searchedType
var allLocations;
var barMarker = new Array();
var clubMarker = new Array();
var restaurantMarker = new Array();
var otherMarker = new Array();
//TODO: Marker zu Events setzen
//TODO: Locations die zur aktuellen Zeit kein Event haben sollen nur als kleine rote Punkte dargestellt werden
//TODO: entscheiden wie die darstellung von events ist -> nur events zur aktuellen zeit darstellen? Events vom ganzen tag darstellen?
//		wenn ja wie unterscheidet man events die aktuell sind von den die zwar am selben tag aber in der vergangenheit oder in der zukunft liegen?
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
        		var geoLocString = getPointFromString(result.geoLocations[loc].slice(1));
        		createMarker(geoLocString, result.types[loc]);
            }
        	showInitialMarkers(window.location.hash.slice(1).split(''));
        }
    })
}

function createMarker(latLng, type){
	var marker = new google.maps.Marker({
		position: latLng,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
	     //show event details page
	     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
	  });
	
	addMarkerToList(type, marker);
}

function addMarkerToList(type, marker){
	if (type == 1){
		restaurantMarker.push(marker);
	} else if (type == 2){
		barMarker.push(marker);
	} else if (type == 3){
		clubMarker.push(marker);
	} else if (type == 4){
		otherMarker.push(marker);
	} else{
		// should be the self pos marker
	}
}


function showInitialMarkers(type){
	if (type == 1){
		showMarkers(restaurantMarker);
	} else if (type == 2){
		showMarkers(barMarker);
	} else if (type == 3){
		showMarkers(clubMarker);
	} else if (type == 4){
		showMarkers(otherMarker);
	} else if (type == 5){
		showMarkers(restaurantMarker);
		showMarkers(barMarker);
		showMarkers(clubMarker);
		showMarkers(otherMarker);
	}
}

function getPointFromString(str){
	var bits = str.split(/,\s*/);
	point = new google.maps.LatLng(parseFloat(bits[0]),parseFloat(bits[1]));
	return point;
}


function hideMarkers(markers){
	for (x in markers){
		markers[x].setMap(null);
	}
}

function showMarkers(markers){
	for (x in markers){
		markers[x].setMap(map);
	}
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
	createCurrentPosMarker(myPos);
}

function createCurrentPosMarker(latLng){
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
	});
}

function onCheckBarChanged(checkbox){
	if (checkbox.checked){
		showMarkers(barMarker);
    } else{
    	hideMarkers(barMarker);
    }
}

function onCheckClubChanged(checkbox){
	if (checkbox.checked){
		showMarkers(clubMarker);
    } else{
    	hideMarkers(clubMarker);
    }
}

function onCheckRestaurantChanged(checkbox){
	if (checkbox.checked){
		showMarkers(restaurantMarker);
    } else{
    	hideMarkers(restaurantMarker);
    }
}

function onCheckOtherChanged(checkbox){
	if (checkbox.checked){
		showMarkers(otherMarker);
    } else{
    	hideMarkers(otherMarker);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

    