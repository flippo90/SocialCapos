function filterByType(allLocations, type){
	result = new Array();
	
	for (var i in allLocations){
		if (allLocations[i].type == type)
			result.push(allLocations[i]);
	}
	
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
	var result = new Array();
	
	for (var i in allLocations){
		for (var k in allEvents){
			if (allLocations[i].id == allEvents[k].id){
				if (eventIsToday(allEvents[k].date)){
					result.push(allLocations[i]);
				}
			}
		}
	}
	
	return result;
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

function getAllLocationsThatDontMatchFilter(allLoc, filteredLocations){
	var result = new Array();
	
	for (var k in allLoc){
		if ($.inArray(allLoc[k], filteredLocations) == -1){
			result.push(allLoc[k]);
		}
	}
	
	return result;
}