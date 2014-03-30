var map;
var myGeoLoaction;
var searchedType

var allLocations = new Array();
var allEvents = new Array();
var allLocationsInRadius = new Array();

var currentShown = new Array();
var locationMarkerMap = {};

var timeFilterResult = new Array();
var dateFilterResult = new Array();

var typeArray = new Array();

google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
	
	typeArray.push("Restaurant");
	typeArray.push("Bar");
	typeArray.push("Club");
	typeArray.push("Other");
	
	document.getElementById('dateInput').value = new Date().toDateInputValue();
	document.getElementById('timeInput').value = new Date().totimeInputValue();
	
	// init google maps
	var mapOptions = {
			center: new google.maps.LatLng(60, 105),
			zoom: 14
		};
		
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	
	//find my location and set marker to it
	var currentLoc = markCurrentLocation();
	
	var radius = document.getElementById('inputRadius').value;
	allLocationsInRadius = getAllLocationsInRadius(myGeoLoaction, radius, allLocations)
	showValue(radius);
	//set markers from locations to map
	setAllLocationEntriesToMap();
	//getAddressFromLatLang(currentLoc);
}

function getAddressFromLatLang(){
    console.log("Entering getAddressFromLatLang: " + myGeoLoaction);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'latLng': myGeoLoaction}, function(results, status) {
		console.log("After getting address");
		console.log(results);
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				console.log(results[1]);
				alert(results[1].formatted_address);
			}
		} else{
			alert("Geocode was not successful for the following reason: " + status);
		}
    });
    console.log("Entering getAddressFromLatLang()");
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
        		var event = new eventConstructor(
        				result.idArray[i], 
        				result.nameArray[i], 
        				result.descriptionArray[i], 
        				result.specialsArray[i],
                		result.dateArray[i], 
        				result.timeArray[i], 
        				result.turnusArray[i], 
                		result.locationIdArray[i]); 
        		allEvents.push(event);
        	}
        	createAllMarkers();
        }
    })
}

function createAllMarkers(){
	createMarkers(allLocations, false);
	showMarkersIfTypeChecked();
	adjustTimeFilters();
}

function adjustTimeFilters(){
	var dateFilterRadio = document.getElementById('filterByDateCheckbox');
	var timeFilterRadio = document.getElementById('filterByCurrentTimeCheckbox');
	console.log(dateFilterRadio.checked);
	if (dateFilterRadio.checked){
		onFilterByCurrentDate(dateFilterRadio);
	} else if (timeFilterRadio.checked){
		onFilterByCurrentTime(timeFilterRadio);
	}
}

function showMarkersIfTypeChecked(){

	for(var i = 0; i < 4; i++){
		if (document.getElementById('check' + typeArray[i]).checked){
			var result = filterByType(allLocations, i + 1); // i+1 => because type in db starts at 1 and in array with 0
			currentShown = addElements(currentShown, result.matched);
		}
	}
	console.log(currentShown)
	showAllMarkersInList(currentShown);
}

function createMarkers(locationList, hasEvent){

	for (var i in locationList){
	
		var marker = new google.maps.Marker({
			position: locationList[i].geoLocation,
			title: locationList[i].type
		});
		
		google.maps.event.addListener(marker, 'click', function() {
		     //show event details page
		     window.open("eventDetails.html?#" + marker.getPosition() ,"_self");
		  });
		
		marker.setIcon(getMarkerIcon(locationList[i].type, hasEvent));		
		locationMarkerMap[locationList[i].geoLocation] = marker;
		//currentShown.push(locationList[i]);
	}
	
	
}

function onTypeFilterChanged(checkbox){
	var result = filterByType(allLocations, checkbox.value);
	if (checkbox.checked){
		currentShown = addElements(currentShown, result.matched);
    } else{
    	currentShown = removeElements(currentShown, result.matched);
    }
	showAllMarkersInList(currentShown);
}

function onFilterByCurrentTime(radioBox){
	var date = document.getElementById('dateInput').value;
	var time = new Date();
	timeFilterResult = getAllLocationsWithEventAtDateAndTime(date, time.getHours(), allLocations, allEvents);
	setIconsFromFilterResult(dateFilterResult.matched, false);
	setIconsFromFilterResult(timeFilterResult.matched, true);
}



function onFilterByTime(radioBox){
	var date = document.getElementById('dateInput').value;
	var time = document.getElementById('timeInput').value.split(":");
	timeFilterResult = getAllLocationsWithEventAtDateAndTime(date, time[0], allLocations, allEvents);
	setIconsFromFilterResult(dateFilterResult.matched, false);
	setIconsFromFilterResult(timeFilterResult.matched, true);
	getAddressFromLatLang();
}

function onFilterByCurrentDate(radio){
	console.log("date value: " + document.getElementById('dateInput').value);
	dateFilterResult = getAllLocationsWithEventAtDate(document.getElementById('dateInput').value, allLocations, allEvents);
	setIconsFromFilterResult(timeFilterResult.matched, false);
	setIconsFromFilterResult(dateFilterResult.matched, true);
}

function setIconsFromFilterResult(list, hasEvent){
	for (var i in list){
		var location = list[i];
		var iconString = getMarkerIcon(location.type, hasEvent);
		locationMarkerMap[location.geoLocation].setIcon(iconString);	
	}
}


function showAllMarkersInList(list){
	
	Object.keys(locationMarkerMap).forEach(function (key) {
			locationMarkerMap[key].setMap(null);
		});
	
	for (var i in list){
		locationMarkerMap[list[i].geoLocation].setMap(map);
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

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
	allLocationsInRadius = getAllLocationsInRadius(myGeoLoaction, newValue, allLocations)
	showAllMarkersInList(allLocationsInRadius);
	
}


function getMarkerIcon(type, hasEvent){
	var color = getColorForMarker(type);
	var iconString;
	
	if (hasEvent){
		iconString = 'http://maps.google.com/mapfiles/ms/icons/'+color+'-dot.png';
	} else{
		iconString = createCircle(color);
	}
	return iconString;
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
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else{console.log("Geolocation is not supported by this browser.");}
}

function showPosition(position)
{
	myGeoLoaction = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.setCenter(myGeoLoaction);
	createCurrentPosMarker(myGeoLoaction);
}

function createCurrentPosMarker(latLng){
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
	});
}

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

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

Date.prototype.totimeInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(11,16);
});


    