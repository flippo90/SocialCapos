var map;
var myGeoLoaction;
var searchedType

var allLocations = new Array();
var allEvents = new Array();

var currentShown = new Array;
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
	createMarkers(allLocations, false);
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
		});
		
		google.maps.event.addListener(marker, 'click', function() {
		     //show event details page
		     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
		  });
		
		marker.setIcon(iconString);		
		locationMarkerMap[locationList[i].geoLocation] = marker;
		//currentShown.push(locationList[i]);
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

function getPointFromString(str){
	var bits = str.split(/,\s*/);
	var point = new google.maps.LatLng(parseFloat(bits[0]),parseFloat(bits[1]));
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

function onTypeFilterChanged(checkbox){
	var result = filterByType(allLocations, checkbox.value);
	if (checkbox.checked){
		currentShown = addElements(currentShown, result.matched);
    } else{
    	currentShown = removeElements(currentShown, result.matched);
    }
	showAllMarkersFromCurrentShown();
}

function showAllMarkersFromCurrentShown(){
	
	Object.keys(locationMarkerMap).forEach(function (key) {
			locationMarkerMap[key].setMap(null);
		// do something with obj[key]
		});
	
	for (var i in currentShown){
		locationMarkerMap[currentShown[i].geoLocation].setMap(map);
	}
}

function addElements(to, which){
	for (var i in which){
		to.push(which[i]);
	}
	return to;
}

function removeElements(from, which){
	for (var i in which){
		var idx = from.indexOf(which[i]);
		if (idx != -1){
			from.splice(idx, 1);
		}
	}
	return from;
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


    