'use strict';


var starz = angular.module('starz', [
        'ngRoute',
        'ngSanitize'
    ]).
    run(['$rootScope', '$location', 'SiteData', function ($rootScope, $location, SiteData) {
        $rootScope.status = {
            data: false,
            loggedIn: false
        };

        $rootScope.$on('authenticate', function (a, b) {
            var a = prompt('Please enter your password to view this content');



            if (a === 'p') {
                $rootScope.status.loggedIn = true;
                $location.path(b);
            } else {
                alert('Incorrect password');
            }
        });

        //Load the JSON content
        SiteData.loadData();

    }]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomepageController'
            }).
            when('/originals/:originalId', {
                templateUrl: 'partials/original.html',
                controller: 'OriginalsController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
