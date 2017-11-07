angular.module('app').service('drivingAppService', [function () {

    this.routes = [];

    this.currentStart = null;
    this.currentEnd = null;

    this.getRoutes = function () {
        this.routes = getFromStorage();
        return this.routes;
    }

    this.setRoute = function (route) {
        if (!this.routes) {
            this.routes = [route];
        } else {
            var exist = false;
            this.routes.forEach(function (r) {
                if (angular.equals(route, r)) {
                    exist = true;
                }
            }, this);
            if (!exist) {
                this.routes.push(route);
            }
        }
        setIntoStorage(this.routes);
    }

    this.removeRoute = function (route) {
        this.routes = this.routes.filter(function (r) {
            return !angular.equals(route, r);
        })
        setIntoStorage(this.routes);
    }

    function getFromStorage() {
        return JSON.parse(localStorage.getItem('driving-app'));
    }

    function setIntoStorage(routes) {
        localStorage.setItem('driving-app', JSON.stringify(routes));
    }

}])