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
        		createMarker(geoLocString, result.types[loc], result.id[loc]);
            }
        	showInitialMarkers(window.location.hash.slice(1).split(''));
        }
    })
}

function createMarker(latLng, type, locationId){
	var marker = new google.maps.Marker({
		position: latLng,
		animation: google.maps.Animation.DROP,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
	     //show event details page
	     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
	  });
	
	addMarkerToList(type, marker, locationId);
}

function addMarkerToList(type, marker, locationId){
	if (type == 1){
		locationHasEventAtThisDay(marker, "green", locationId);
		restaurantMarker.push(marker);
	} else if (type == 2){
		locationHasEventAtThisDay(marker, "red", locationId);
		barMarker.push(marker);
	} else if (type == 3){
		locationHasEventAtThisDay(marker, "blue", locationId);
		clubMarker.push(marker);
	} else if (type == 4){
		locationHasEventAtThisDay(marker, "yellow", locationId)
		otherMarker.push(marker);
	} else{
		// should be the self pos marker
	}
}

function createCircle(color){
	var redStar = {
			  path: google.maps.SymbolPath.CIRCLE,
			  fillColor: color,
			  fillOpacity: 1,
			  scale: 3,
			  strokeColor: color,
			  strokeWeight: 10
			};
	return redStar;
}

function locationHasEventAtThisDay(marker, color, locationId){
	$.ajax({
        type: "GET",
        url: "php/getEventsForLocation.php",
        dataType: "json",
        
        success: function(result){
        	var iconString = createCircle(color);
        	var eventDate = locationHasEvent(result, locationId);
        	if (eventDate != null){
        		if (eventIsToday(eventDate)){
        			iconString = 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png';
        		}
        	}
        	marker.setIcon(iconString);
        }
    })
}

function locationHasEvent(dbResult, locationId){
	for (var i in dbResult.dateArray){
		if (dbResult.locationIdArray[i] == locationId){
			return dbResult.dateArray[i];
		}        		
    }
}

function eventIsToday(eventDate){
	var today = new Date();
	var dd = today.getDate().toString();
	var mm = today.getMonth()+1; //January is 0!
	var mms = mm.toString();
	var yyyy = today.getFullYear();
	
	if (mms.length == 1){
		mms = "0" + mms;
	}
	
	if (dd.length == 1)
		dd = "0" + dd;
	
	if (eventDate == yyyy + "-" + mms + "-" + dd){
		return true;
	}
	else{
		return false;
	}
}


function showInitialMarkers(type){
	if (type == 1){
		showMarkers(restaurantMarker);
		document.getElementById("checkRestaurant").checked = true;
	} else if (type == 2){
		showMarkers(barMarker);
		document.getElementById("checkBar").checked = true;
	} else if (type == 3){
		showMarkers(clubMarker);
		document.getElementById("checkClub").checked = true;
	} else if (type == 4){
		showMarkers(otherMarker);
		document.getElementById("checkOther").checked = true;
	} else if (type == 5){
		showMarkers(restaurantMarker);
		showMarkers(barMarker);
		showMarkers(clubMarker);
		showMarkers(otherMarker);
		document.getElementById("checkOther").checked = true;
		document.getElementById("checkClub").checked = true;
		document.getElementById("checkRestaurant").checked = true;
		document.getElementById("checkBar").checked = true;
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

    