angular.module('app').component('home', {
    templateUrl: 'src/app/views/partials/home.partial.html',
    controller: ['$scope', '$state', 'drivingAppService', function ($scope, $state, drivingAppService) {

        var ctrl = this;

        this.$onInit = function () {
            getRoutes();
            console.log(drivingAppService.currentStart)
        }

        function getRoutes() {
            $scope.routes = drivingAppService.getRoutes();
        }

        ctrl.submit = function () {
            drivingAppService.setRoute({ start: $scope.start, end: $scope.end });
            getRoutes();
            drivingAppService.currentStart = $scope.start;
            drivingAppService.currentEnd = $scope.end;
            $state.go('details');
        }

        ctrl.removeRoute = function (route) {
            drivingAppService.removeRoute(route);
            getRoutes();
        }

        ctrl.details = function(route, index){
            drivingAppService.currentStart = route.start;
            drivingAppService.currentEnd = route.end;
            drivingAppService.currentIndex = index;
            $state.go('details');
        }


    }]
})