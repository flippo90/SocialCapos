//TODO: Eventdetails zum aktuell laufenden event aus db holen (mit hilfe von location koordinaten)
function init(){
	
	// here we have to get the information for the specific event that is at the location with the koordinated given
	// with the link at the hash tag...
	
	// this are the koordinates of the bar. we can search for the location with them
	var coordinates = window.location.hash.slice(1);
	
	//the information from the event that takes place
	var geoLocationLabel = document.getElementById("geoLocationInput").innerHTML = coordinates;
	var locationNameLabel = document.getElementById("locationName").innerHTML  = "Capos";
	var partyNameLabel = document.getElementById("partyName").innerHTML  = "Geilste Party ever";
	var specialsLabel = document.getElementById("specials").innerHTML  = "2 Cocktails zum preis von einem!!!";
	var numberLikesLabel = document.getElementById("numberLikes").innerHTML  = "253";
	var openingTimeLabel = document.getElementById("openingTime").innerHTML  = "22-3 Uhr";
}