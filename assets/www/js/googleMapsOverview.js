var map;
var myGeoLoaction;
var searchedType

var allLocations = new Array();
var allEvents = new Array();
var currentShown = new Array();

var locationMarkerMap = {};

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
	//set markers from locations to map
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
        		var location = new locationConstructor(result.id[loc], result.names[loc], 
        				geoLocString, result.openingHours[loc], result.types[loc], result.likes[loc])
        		allLocations.push(location)
            }
        	getAllEvents();
        }
    })
}


function getAllEvents(){
	$.ajax({
        type: "GET",
        url: "php/getEventsForLocation.php",
        dataType: "json",
        
        success: function(result){
        	for (var i in result.idArray){
        		var event = new eventConstructor(result.idArray[i], result.dateArray[i], 
        				result.timeArray[i], result.locationIdArray[i], result.nameArray[i], 
        				result.descriptionArray[i], result.turnusArray[i], result.specialsArray[i]);
        		allEvents.push(event);
        	}
        	createAllMarkers();
        }
    })
}

function createAllMarkers(){
	var filteredLocationList = getAllLocationsWithEventToday(allLocations, allEvents);
	createMarkers(filteredLocationList, true);
	var others = getAllLocationsThatDontMatchFilter(allLocations, filteredLocationList);
	createMarkers(others, false);
}

function createMarkers(locationList, hasEvent){

	for (var i in locationList){
		var color = getColorForMarker(locationList[i].type);
		var iconString;
		
		if (hasEvent){
			iconString = 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png';
		} else{
			iconString = createCircle(color);
		}
		
		var marker = new google.maps.Marker({
			position: locationList[i].geoLocation,
			animation: google.maps.Animation.DROP,
		});
		
		google.maps.event.addListener(marker, 'click', function() {
		     //show event details page
		     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
		  });
		
		marker.setIcon(iconString);		
		
		addMarkerToList(locationList[i].type, marker);
		locationMarkerMap[locationList[i].geoLocation] = marker;
	}
}

function getColorForMarker(type){
	var color;
	if (type == 1)
		color = 'yellow'
	else if (type == 2)
		color = 'green';
	else if (type == 3)
		color = 'red';
	else 
		color = 'blue';
	
	return color;
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

function createCircle(color){
	var circle = {
			  path: google.maps.SymbolPath.CIRCLE,
			  fillColor: color,
			  fillOpacity: 1,
			  scale: 3,
			  strokeColor: color,
			  strokeWeight: 10
			};
	return circle;
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
	var point = new google.maps.LatLng(parseFloat(bits[0]),parseFloat(bits[1]));
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
		currentShown.push(markers[x]);
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

function onFilterByCurrentTime(radioBox){
	if (radioBox.checked){
		var afterFilterListe = getAllLocationsWithEventNow(allLocations, allEvents);
		console.log(afterFilterListe);
	} else{
		console.log("no checked");
	}
}

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}

google.maps.event.addDomListener(window, 'load', initialize);

function eventConstructor(id, name, description, specials, date, time, turnus, location){
	this.id = id;
	this.name = name;
	this.description = description;
	this.specials = specials;
	this.date = date;
	this.time = time;
	this.turnus = turnus;
	this.location = location;
}

function locationConstructor(id, name, geoLocation, openingHours, type, likes){
	this.id = id;
	this.name = name;
	this.geoLocation = geoLocation;
	this.openingHours = openingHours;
	this.type = type;
	this.likes = likes;
}


    