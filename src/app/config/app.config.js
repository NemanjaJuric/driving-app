angular.module('app').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $locationProvider.hashPrefix('');

    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'src/app/views/home.view.html'
        })
        .state('details', {
            url: '/details',
            controller: 'DetailsController',
            templateUrl: 'src/app/views/details.view.html'
        });

})