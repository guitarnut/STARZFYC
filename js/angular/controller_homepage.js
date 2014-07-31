'use strict';

starz.controller('HomepageController', ['$rootScope', '$scope', '$location', 'SiteData', function ($rootScope, $scope, $location, SiteData) {

    //Check to see if data exists for this show
    $rootScope.$watch('status.data', function () {
        if ($rootScope.status.data) {
            $scope.shows = SiteData.getShows();
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