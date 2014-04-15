var allLocations = new Array();

function createTestEvents(){
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
        		createEventForLocation(location);
            }
        }
    })
}

function createEventForLocation(location){
	var name = location.name;
	var descirption = location.name;
	var specials = location.name;
	
	var today = new Date();
	var dd = today.getDate().toString();
	var mm = today.getMonth()+1; //January is 0!
	var mms = mm.toString();
	var yyyy = today.getFullYear();
	
	var date = yyyy + "-" + mms + "-" + dd;
	
	var min = 1;
	var max = 24
	
	var randomTimeStart = Math.floor(Math.random() * (max - min + 1)) + min;
	var randomTimeEnd = Math.floor(Math.random() * (max - min + 1)) + min;
	var hours = randomTimeStart + "-" + randomTimeEnd;
	var turnus = 0
	var location = location.id
	console.log("locationName " + name + " descirption " + descirption + " specials " + specials + " date " + date + " hours " + hours + " turnus " + turnus + " location " + location);
	$.ajax({
         type: "POST",
         url: "php/saveEvent.php",
         data: "name=" + name + "&descirption=" + descirption + "&specials=" + specials + "&date=" + date+ "&hours=" + hours + "&turnus=" + turnus + "&location=" + location,
         success: function(msg)
         {
             console.log("successfully added");
         }
    });
}

