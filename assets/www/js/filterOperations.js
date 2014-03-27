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

function getAllLocationsWithEventToday(allLocations, allEvents){
	var matched = new Array();
	var notMatched = new Array();	
	var foundEvent = false;
	for (var i in allLocations){
		var location = allLocations[i];
		for (var k in allEvents){
			var event = allEvents[k];
			if (allLocations[i].id == event.location){
				if (eventIsToday(event.date)){
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

function getAllLocationsWithEventNow(allLocations, allEvents){
	var matched = new Array();
	var notMatched = new Array();
	var matchedItemFound = false;
	
	for (var i in allLocations){
		for (var k in allEvents){
			if (allLocations[i].id == allEvents[k].id){
				if (eventIsNow(allEvents[k].date, allEvents[k].time)){
					matchedItemFound = true;
				}
			}
		}
		
		if (matchedItemFound)
			matched.push(allLocations[i]);
		else
			notMatched.push(allLocations[i]);
		
		matchedItemFound = false;
	}
	
	return new filterResultConstructor(matched, notMatched);
}

function eventIsNow(date, timespan){
	if (eventIsToday(date)){
		var currentDate = new Date();
		var currentHour = currentDate.getHours();
		var timeSpanArray = timespan.split("-");
		// wenn ein Event in 4 Stunden beginnt wird es auch noch angezeigt.
		if (currentHour >= timeSpanArray[0] - 4 && currentHour < timeSpanArray[1])
			return true;
	}
	return false;
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

function filterResultConstructor(matched, notMatched){
	this.matched = matched;
	this.notMatched = notMatched;
}

