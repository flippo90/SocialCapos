var app = angular.module('llbec', ['google-maps']);

app.run(function($rootScope){
});

app.controller('sectionController', function($scope){
   $scope.sections = {
        mainSection: {
            css: "section-main"
        },
        einstellungenSection: {
            css: "section-einstellungen"
        },
        filterSection: {
            css: "section-suche"
        }
   };

    $scope.activateSuche = function(){
        if ( $scope.sections.filterSection.css == 'active') {
            $scope.sections.filterSection.css = "";
        } else {
            $scope.sections.filterSection.css = "active";
        }
        $scope.sections.einstellungenSection.css = "";
    };

    $scope.activateEinstellungen = function(){
        if ( $scope.sections.einstellungenSection.css == 'active') {
            $scope.sections.einstellungenSection.css = "";
        } else {
            $scope.sections.einstellungenSection.css = "active";
        }
        $scope.sections.filterSection.css = "";
    };

});

app.controller('mapController', function($scope){
    function showCurrentLocation()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(locationFound);
        }
        else{console.log("Geolocation is not supported by this browser.");}
    }

    function locationFound(position)
    {
        $scope.map.center.latitude = position.coords.latitude;
        $scope.map.center.longitude = position.coords.longitude;
        $scope.map.zoom = 17;

        $scope.map.userCoords.latitude = position.coords.latitude;
        $scope.map.userCoords.longitude = position.coords.longitude;
    }

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 4,
        userCoords: {
            latitude: 0,
            longitude: 0
        }
    };

    showCurrentLocation();
    $scope.centerOnMyLocation = function(){
        showCurrentLocation();
    };
});



