function onShowBars(){
	window.open("googleMapsOverview.html?#" + 2 ,"_self");
}

function onShowRestaurants(){
	window.open("googleMapsOverview.html?#" + 1 ,"_self");
}

function onShowClubs(){
	window.open("googleMapsOverview.html?#" + 3 ,"_self");
}

function onShowOther(){
	window.open("googleMapsOverview.html?#" + 4 ,"_self");
}

function onShowAll(){
	window.open("googleMapsOverview.html?#" + 5 ,"_self");	
}

$(document).ready(function() {
	$('#btnSuche').on('click', function() {
    	$('#section-suche').toggleClass('active');
    	$('#section-einstellungen').removeClass('active');
	});

	$('#btnEinstellungen').on('click', function() {
	    $('#section-einstellungen').toggleClass('active');
	    $('#section-suche').removeClass('active');
	});

	$('#section-main').on('click', function() {
	    $('#section-suche, #section-einstellungen').removeClass('active');
	});
});
