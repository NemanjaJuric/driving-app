angular.module('app').component('map', {
    templateUrl: 'src/app/views/partials/map.partial.html',
    controller: ['$scope', 'drivingAppService', '$timeout', function ($scope, drivingAppService, $timeout) {

        var ctrl = this;

        ctrl.$onInit = function () {
            $scope.start = drivingAppService.currentStart;
            $scope.end = drivingAppService.currentEnd;
            showMap(true);
            var request = {
                destination: $scope.start,
                origin: $scope.end,
                travelMode: 'DRIVING'
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function (response, status) {
                if (status === 'OK') {
                    initMap(response);
                    $timeout(function(){
                        initInfo(response)
                    }, 0)
                } else if (status === 'NOT_FOUND') {
                    $timeout(function(){
                        showMap(false);
                    }, 0)
                }
            });
        }

        function initMap(response){
            var mapOptions = {
                zoom: 8
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });
            directionsDisplay.setDirections(response);
        }

        function initInfo(response) {
            $scope.distance = response.routes[0].legs[0].distance.text;
            $scope.duration = response.routes[0].legs[0].duration.text;
        }

        function showMap(status) {
            $scope.status = status
            $scope.mapVisible = status && $scope.start && $scope.end ? true : false;
        }


    }]
})