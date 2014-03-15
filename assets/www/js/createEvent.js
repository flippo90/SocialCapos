function initialize() {
	document.getElementById("successLabel").style.display = "none";
	
}

function onCreateEvent(){
	document.getElementById("successLabel").style.display = "none";
	// mit diesen werten soll ein Eintrag in die tabelle locations eingefügt werden
	var name = document.getElementById("nameInput").value;
	var descirption = document.getElementById("descriptionInput").value;
	var specials = document.getElementById("specialsInput").value;
	var date = document.getElementById("dateInput").value;
	var hours = document.getElementById("hoursInput").value;
	var turnus = checkTurnus();
	var location = document.getElementById("locationSelector").value;
	console.log("locationName " + name + " descirption " + descirption + " specials " + specials + " date " + date + " hours " + hours + " turnus " + turnus + " location " + location);
	$.ajax({
         type: "POST",
         url: "php/saveEvent.php",
         data: "name=" + name + "&descirption=" + descirption + "&specials=" + specials + "&date=" + date+ "&hours=" + hours + "&turnus=" + turnus + "&location=" + location,
         success: function(msg)
         {
             document.getElementById("successLabel").style.display = "inline";
         }
    });
}

function checkTurnus(){
	var x = document.getElementsByName('r');
    for(var k=0;k<x.length;k++)
      if(x[k].checked){
    	  return x[k].value;
      }
}
    