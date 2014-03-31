function getAllLocationsInRadius(center, radius, allLocations){
	var result = new Array();
	for (var i in allLocations){
		if (getDistance(center, allLocations[i].geoLocation) <= radius){
			result.push(allLocations[i]);
		}
	}
	
	return result;
}

var rad = function(x) {
	  return x * Math.PI / 180;
}

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d / 1000; // returns the distance in meter
}

function filterByType(allLocations, type){
	matched = new Array();
	notMatched = new Array();
	for (var i in allLocations){
		if (allLocations[i].type == type){			
			matched.push(allLocations[i]);
		}
		else{
			notMatched.push(allLocations[i]);
		}
	}
	
	var result = new filterResultConstructor(matched, notMatched); 
	return result;
}

function filterByName(allLocations, name){
	result = new Array();
	
	for (var i in allLocations){
		if (allLocations[i].name == name)
			result.push(allLocations[i]);
	}
	
	return result;
}

function filterById(allLocations, id){
	result = new Array();
	
	for (var i in allLocations){
		if (allLocations[i].id == id)
			result.push(allLocations[i]);
	}
	
	return result;
}

function getAllLocationsWithEventAtDate(date, allLocations, allEvents){
	var matched = new Array();
	var notMatched = new Array();	
	var foundEvent = false;
	for (var i in allLocations){
		var location = allLocations[i];
		for (var k in allEvents){
			var event = allEvents[k];
			if (allLocations[i].id == event.location){
				if (date == event.date){
					foundEvent = true;
				}
			}
		}
		
		if (foundEvent)
			matched.push(location);
		else
			notMatched.push(location);
		
		foundEvent = false;
	}
	
	var result = new filterResultConstructor(matched, notMatched);
	return result;
}

// geht nicht
function getAllLocationsWithEventAtDateAndTime(date, time, allLocations, allEvents){
	var matched = new Array();
	var notMatched = new Array();	
	var foundEvent = false;
	for (var i in allLocations){
		var location = allLocations[i];
		for (var k in allEvents){
			var event = allEvents[k];
			if (allLocations[i].id == event.location){
				if (date == event.date && eventIsAtTime(time, event.time)){
					foundEvent = true;
				}
			}
		}
		
		if (foundEvent)
			matched.push(location);
		else
			notMatched.push(location);
		
		foundEvent = false;
	}
	
	var result = new filterResultConstructor(matched, notMatched);
	return result;
}

function eventIsAtTime(time, eventTimespan){
	var timeSpanArray = eventTimespan.split("-");
	// wenn ein Event in 2 Stunden beginnt wird es auch noch angezeigt.
	if (time >= timeSpanArray[0] - 2 && time < timeSpanArray[1])
		return true;
	else
		return false;
}

function filterResultConstructor(matched, notMatched){
	this.matched = matched;
	this.notMatched = notMatched;
}

