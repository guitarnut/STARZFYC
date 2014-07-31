'use strict';

starz.controller('NavigationController', ['$rootScope', '$scope', '$location', 'SiteData', function ($rootScope, $scope, $location, SiteData) {

    $scope.current = '';

    $scope.changeNav = function (n) {
        //$scope.current = n;
    }

    //Get shows to populate navbar
    $rootScope.$watch('status.data', function () {
        if ($rootScope.status.data) {
            $scope.nav = SiteData.getNav();
        }
    });

    //Handles non-authenticated users
    $scope.gotoPage = function redirect(p,s) {
        var l = p + s;

        if(l === 'undefined') l = '';

        if ($rootScope.status.loggedIn) {
            $location.path(l);
        } else {
            $scope.$emit('authenticate', l);
        }
    }

}]);