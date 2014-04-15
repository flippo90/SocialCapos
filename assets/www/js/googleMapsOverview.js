var map;
var myGeoLoaction;
var searchedType;

var allLocations = new Array();
var allLocationsInRadius = new Array();
var currentShown = new Array();

var timeFilterResult = new Array();
var dateFilterResult = new Array();

var typeArray = new Array();

var centerLocation;

var autocomplete

var currentCenterMarker;
var currentCenterRadiusCircle;

var detailLocation;
var detailEvent;

google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {	
	initGoogleMaps();
	createTypeArray();
	initDateAndTimeFilterValues();
	initRadiusValue();
	initAutocomplete();
	fillMap();	
}

function fillMap()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(locationFound);
	}
	else{console.log("Geolocation is not supported by this browser.");}
}

function locationFound(position)
{
	var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	markCurrentPosition(loc);
	myGeoLoaction = loc;
	
	centerLocation = loc;
	getAllLocationsWithEvents();
}


function getAllLocationsWithEvents(){
	$.ajax({
        type: "GET",
        url: "php/getAllLocations.php",
        dataType: "json",

        success: function(result){
        	allLocations = getLocationsFromResult(result);        	
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
        	setAllEventsToLocation(result);
        	createMarkers(allLocations);
        	adjustAllFilter();
        }
    })
}

function createMarkers(locationList, hasEvent){
	for (var i in locationList){
		
		var marker = new google.maps.Marker({
			position: locationList[i].geoLocation,
			title: locationList[i].id,
			id: i
		});
		
		google.maps.event.addListener(marker, 'click', function() {
		    var loc = getLocationByMarker(this);
		    detailLocation = loc;
		    detailEvent = loc.eventMatchedFilter;
		    initEventDetails(loc, loc.eventMatchedFilter);
		    
		    $('#btnEinstellungen').click();
		});
		
		marker.setIcon(getMarkerIcon(locationList[i].type, false));	
		locationList[i].marker = marker;
	}
}

function initEventDetails(location, event){
	document.getElementById("locationName").innerHTML = location.name;
	document.getElementById("locationAddress").innerHTML = location.address;
	getAddressFromLatLang(location.geoLocation);
	
	locationAddress
	if (event == null){
		onShowLocation(location);
	}else{
		onShowEvent(event);
		loadComments();
	}
}

function onShowEvent(event){
	document.getElementById("eventSection").style.visibility = 'visible'
	document.getElementById("locationSection").style.visibility = 'hidden';

	document.getElementById("eventName").innerHTML = event.name;
	document.getElementById("specials").innerHTML = event.specials;
	document.getElementById("numberLikesEvent").innerHTML = event.likes;
	document.getElementById("eventTime").innerHTML = event.time;
}

function onShowLocation(location){
	document.getElementById("eventSection").style.visibility = 'hidden';
	document.getElementById("locationSection").style.visibility = 'visible';
	
	document.getElementById("openingTime").innerHTML = location.openingHours;
	document.getElementById("numberLikes").innerHTML = location.likes;
	
	//document.getElementById("comments").innerHTML = location.comments;
}

function loadComments(){
	var commentList = new Array();
	$.ajax({
        type: "GET",
        url: "php/loadCommentsForEvent.php",
        data: "id=" + detailEvent.id,
        dataType: "json",

        success: function(result){
        	for (var i in result.commentIds){
        		var comment = new commentConstructor(result.commentIds[i], result.events[i], result.texts[i], result.writers[i]);
                commentList.push(comment);
        	}
        	showComments(commentList);
        }
    })
}

function showComments(commentList){
	var table = document.getElementById('commentList');
	var html = "";
	for(var i in commentList){
		html = html + "<label>" + commentList[i].text +  "</label><br>";
	}
	table.innerHTML = html;
}

function onPostComment(sender){
	if (sender == "event"){
		var writer = "philipp";
		var text = document.getElementById("eventCommentInput").value;
		if (text == ""){
			alert("Bitte Text für einen Kommentar eingeben");
		} else{			
			postComment("postEventComment", text, writer);
		}
	} else{
		
	}
}

function postComment(phpFilename, text, writer){
	$.ajax({
        type: "POST",
        url: "php/" + phpFilename + ".php",
        data: "id=" + detailEvent.id + "&text=" + text + "&writer=" + writer,
        success: function(msg)
        {
        	
        }
   });
}

function centerLocationChooser(value){
	if (value == "currPos"){
		centerLocation = myGeoLoaction;
	} else if (value == "place"){
		if (typeof autocomplete.getPlace() == 'undefined'){
			//alert('Please enter a Location');
		}else{
			centerLocation = autocomplete.getPlace().geometry.location;
		}
	}
	markCurrentPosition(centerLocation);
	adjustAllFilter();
}

function timeInputFocusLost(){
	if (document.getElementById('filterByTimeCheckbox').checked)
		onFilterByTime();
}

function dateInputFocusLost(){
	if (document.getElementById('filterByDateCheckbox').checked){
		onFilterByCurrentDate();
	}
}

function setPlaceChangedListener(){
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		if (document.getElementById('filterByPlaceCheckbox').checked){
			var place = autocomplete.getPlace();
		    if (!place.geometry) {
		    	return;
		    }	    
		    
		    centerLocation = place.geometry.location;
		    markCurrentPosition(centerLocation);
		    adjustAllFilter();
		}	
	});
}

function adjustAllFilter(){
	var radius = document.getElementById('inputRadius').value;	
	allLocationsInRadius = getAllLocationsInRadius(centerLocation, radius, allLocations)
	
	currentShown = showMarkersIfTypeChecked(allLocationsInRadius);
	
	adjustTimeFilters(currentShown);
	
	createTable(currentShown);
	
	showAllMarkersInList(currentShown);
}

function showMarkersIfTypeChecked(list){
	var shown = new Array();
	
	for(var i = 0; i < 4; i++){
		if (document.getElementById('check' + typeArray[i]).checked){
			var result = filterByType(list, i + 1); // i+1 => because type in db starts at 1 and in array with 0
			shown = addElements(shown, result.matched);
		}
	}
	return shown;
}

function adjustTimeFilters(){
	var dateFilterRadio = document.getElementById('filterByDateCheckbox');
	var filterByTimeCheckbox = document.getElementById('filterByTimeCheckbox');
	if (dateFilterRadio.checked){
		onFilterByCurrentDate();
	} else if (filterByTimeCheckbox.checked){
		onFilterByTime();
	}
}

function onFilterByCurrentTime(){	
	var date = document.getElementById('dateInput').value;
	var time = new Date();
	document.getElementById('timeInput').value = "" + time.getHours() + ":" + time.getMinutes();
	document.getElementById('filterByTimeCheckbox').checked = true;
	onFilterByTimeAndDate(date, time.getHours());
}

function onFilterByTime(){
	var date = document.getElementById('dateInput').value;
	var time = document.getElementById('timeInput').value.split(":");
	var timeInt = parseInt(time[0]);
	onFilterByTimeAndDate(date, timeInt);
}

//time has to be a number
function onFilterByTimeAndDate(date, time){
	timeFilterResult = new Array();
	timeFilterResult = getAllLocationsWithEventAtDateAndTime(date, time, allLocationsInRadius);
	setIconsFromFilterResult(dateFilterResult.matched, false);
	setIconsFromFilterResult(timeFilterResult.matched, true);
	createTable(currentShown);
}

function onFilterByCurrentDate(){
	dateFilterResult = getAllLocationsWithEventAtDate(document.getElementById('dateInput').value, allLocationsInRadius);
	setIconsFromFilterResult(timeFilterResult.matched, false);
	setIconsFromFilterResult(dateFilterResult.matched, true);
	createTable(currentShown);
}

function createTable(locations){
	var table = document.getElementById('locationList');
	var html = "";
	for(var i in locations){
		
		var color;
		if (!(locations[i].marker.icon instanceof Object)){
			color = "#00FF00";
		}
		else{
			color = "";
		}
		html = html + "<tr bgcolor=\"" + color + "\">";
		html = html + "<td>" + locations[i].id + "</td>";
		html = html + "<td>" + locations[i].name + "</td>";
		html = html + "<td>" + locations[i].geoLocation + "</td>";
		html = html + "<td>" + locations[i].type + "</td>";
		html = html + "<td>" + locations[i].openingHours + "</td>";
		html = html + "<td>" + locations[i].likes + "</td>";
		html = html + "</tr>"
	}
	table.innerHTML = html;
}

function onTypeFilterChanged(checkbox){
	var result = filterByType(allLocationsInRadius, checkbox.value);
	if (checkbox.checked){
		currentShown = addElements(currentShown, result.matched);
    } else{
    	currentShown = removeElements(currentShown, result.matched);
    }
	showAllMarkersInList(currentShown);
}

function onShowLocations(checked){
	if (checked == true){
		document.getElementById('map-canvas').style.display = "block";
		document.getElementById('list-canvas').style.display = "none";
	} else{
		document.getElementById('map-canvas').style.display = "none";
		document.getElementById('list-canvas').style.display = "block";
	}
}

function setIconsFromFilterResult(list, hasEvent){
	for (var i in list){
		var location = list[i];
		var iconString = getMarkerIcon(location.type, hasEvent);
		location.marker.setIcon(iconString);	
	}
}

function showAllMarkersInList(list){

	showMapEntries(list);
	createTable(list);
}

function getLocationByMarker(theMarker){
	for (var i in allLocationsInRadius){
		if (allLocationsInRadius[i].marker.id == theMarker.id){
			return allLocationsInRadius[i];
		}
	}
	
	alert("Eigentlich sollte zu jeder Location ein Marker existieren!");
	return null;
}

function showMapEntries(list){
	for (var i in allLocations){
		allLocations[i].marker.setMap(null);
	}
	
	for (var i in list){
		list[i].marker.setMap(map);
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
	createCurrentRaiusCircle(myGeoLoaction);	
	adjustAllFilter();
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

function markCurrentPosition(position){
	map.setCenter(position);
	
	if (typeof currentCenterMarker != 'undefined')
		currentCenterMarker.setMap(null);
	
	createCurrentRaiusCircle(position);
	
	createCurrentPosMarker(position);
}

function createCurrentRaiusCircle(latLng){
	if (typeof currentCenterRadiusCircle != 'undefined')
		currentCenterRadiusCircle.setMap(null);
	
	var radius = document.getElementById('inputRadius').value;
		
	var marker = new google.maps.Circle({
        center: latLng,
        radius: radius * 1000,
        fillColor: "grey",
        fillOpacity: 0.3,
        strokeOpacity: 0.0,
        strokeWeight: 0,
        map: map
	});
	currentCenterRadiusCircle = marker;
}

function createCurrentPosMarker(latLng){
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
	});
	currentCenterMarker = marker;
}

function initAutocomplete(){
	var input = document.getElementById('inputOrt');
	
	var options = {
	  bounds: yourBounds,
	  types: ['(cities)']
	};
	
	autocomplete = new google.maps.places.Autocomplete(input, options);
	setPlaceChangedListener();
}
//theoretisch müsste man sich nach dem like den aktuellen Wert aus der db nochmal holen
//vllt könnte es den benutzer aber auch verwirren wenn anzahl likes auf einmal springt?

//Wie kann man sicherstellen dass ein Benutzer nur 1x den like button drückt und nicht öfters?
function likeLocationButtonClicked(){		
	$.ajax({
        type: "POST",
        url: "php/increaseLocationLikes.php",
        data: "id=" + detailLocation.id,
        success: function(msg)
        {        	
        	var numberOfLikes = parseInt(detailLocation.likes);
        	document.getElementById("numberLikes").innerHTML = numberOfLikes + 1;        	
        }
   });
}

//theoretisch müsste man sich nach dem like den aktuellen Wert aus der db nochmal holen
//vllt könnte es den benutzer aber auch verwirren wenn anzahl likes auf einmal springt?

//Wie kann man sicherstellen dass ein Benutzer nur 1x den like button drückt und nicht öfters?
function likeEventButtonEvent(){
	$.ajax({
        type: "POST",
        url: "php/increaseEventLikes.php",
        data: "id=" + detailEvent.id,
        success: function(msg)
        {
        	var numberOfLikes = parseInt(detailEvent.likes);
        	document.getElementById("numberLikesEvent").innerHTML = numberOfLikes + 1;
        	
        }
   });
}

function getAddressFromLatLang(latLng){
	var geocoder = new google.maps.Geocoder();
	var result = null
	geocoder.geocode({'latLng': latLng}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      if (results[1]) {
	    	  result = results[1].formatted_address;
	    	  //document.getElementById("locationAddress").innerHTML = result;
	      } else {
	        alert('No results found');
	      }
	    } else {
	      alert('Geocoder failed due to: ' + status);
	    }
	  });
}

function getLocationsFromResult(result){
	var locations = new Array();
	for (var loc in result.geoLocations){
		var geoLocString = getPointFromString(result.geoLocations[loc].slice(1));
		var location = new locationConstructor(result.id[loc], result.names[loc], 
				geoLocString, result.openingHours[loc], result.types[loc], result.likes[loc], result.address[loc]);
		locations.push(location);
    }
	return locations;
}

function setAllEventsToLocation(result){
	for (var i in result.idArray){
		var event = new eventConstructor(
				result.idArray[i], 
				result.nameArray[i], 
				result.descriptionArray[i], 
				result.specialsArray[i],
        		result.dateArray[i], 
				result.timeArray[i], 
				result.turnusArray[i], 
        		result.locationIdArray[i],
        		result.likesArray[i],
        		result.commentsArray[i]); 
		
		for (var i in allLocations){
			if (allLocations[i].id == event.location){
				allLocations[i].events.push(event);
			}
		}
	}
}

function initGoogleMaps(){
	var mapOptions = {
			zoom: 14
		};
		
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function initAutocomplete(){
	var input = document.getElementById('inputOrt');
	autocomplete = new google.maps.places.Autocomplete(input);
	setPlaceChangedListener();
}

function initDateAndTimeFilterValues(){
	document.getElementById('dateInput').value = new Date().toDateInputValue();
	document.getElementById('timeInput').value = new Date().totimeInputValue();

}

function initRadiusValue(){
	var radius = document.getElementById('inputRadius').value;
	showValue(radius);
}

function createTypeArray(){
	typeArray.push("Restaurant");
	typeArray.push("Bar");
	typeArray.push("Club");
	typeArray.push("Other");
}

function eventConstructor(id, name, description, specials, date, time, turnus, location, likes, comments){
	this.id = id;
	this.name = name;
	this.description = description;
	this.specials = specials;
	this.date = date;
	this.time = time;
	this.turnus = turnus;
	this.location = location;
	this.likes = likes;
	this.comments = comments;
}

function locationConstructor(id, name, geoLocation, openingHours, type, likes, address){
	this.id = id;
	this.name = name;
	this.geoLocation = geoLocation;
	this.openingHours = openingHours;
	this.type = type;
	this.likes = likes;
	this.marker = null;
	this.events = new Array();
	this.eventMatchedFilter = null;
	this.address = address;
}

function commentConstructor(id, eventId, text, writer){
	this.id = id;
	this.eventId = eventId;
	this.text = text;
	this.writer = writer;
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


    