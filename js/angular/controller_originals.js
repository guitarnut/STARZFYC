'use strict';

/* Requires spin.min.js and spincontrol.js */

starz.controller('OriginalsController', ['$rootScope', '$scope', '$routeParams', '$location', '$window', 'SiteData', 'VideoPlayer', function ($rootScope, $scope, $routeParams, $location, $window, SiteData, VideoPlayer) {

    $scope.originalId = $routeParams.originalId;
    $scope.playing = false;

    var reload;

    var videoSpin = SpinGen.newSpinner(),
        thumbSpin = SpinGen.newSpinner();

    function loadPlaylist() {
        videoSpin.start('spin1');
        thumbSpin.start('spin2');

        if (BC.loaded) {
            VideoPlayer.loadPlaylist($scope.show.playlistId);
            BC.loaded = false;
            videoSpin.stop();
        } else {
            //Try again if the player is not initiated
            //console.log('Player not ready...');
            reload = setTimeout(loadPlaylist, 500);
        }
    }

    //Check to see if data exists for this show and that the user is logged in
    $rootScope.$watch('status.data', function () {
        if ($rootScope.status.loggedIn) {
            if ($rootScope.status.data) {
                $scope.show = SiteData.getShow($scope.originalId);
                if (!$scope.show) {
                    redirect('404');
                } else {
                    loadPlaylist();
                }
            }
        } else {
            redirect('login');
       }
    });

    $rootScope.$on('playlistReady', function (a, d) {
        $scope.videos = d.videos;

        for (var key in $scope.videos) {
            for (var length in $scope.videos[key]) {
                //Change milliseconds to minutes
                if (length === 'length') {
                    if (Number($scope.videos[key][length]) > 120) {
                        var time = $scope.videos[key][length];
                        time = Math.round(time / 60000);
                        $scope.videos[key][length] = time;
                    }
                }
            }
        }

        thumbSpin.stop();
        $scope.$digest();

    });

    $scope.playVideo = function (v) {
        $scope.playing = true;
        VideoPlayer.playVideo(v);
    };

    $scope.$on('$destroy', function() {
        videoSpin.stop();
        thumbSpin.stop();
        clearTimeout(reload);
    });

    //Handles user navigating to an original that doesn't exist, and non-authenticated users
    function redirect(v) {
        switch(v) {
            case '404':
                $location.path('#/');
                break;
            case 'login':
                $location.path('#/');
                break;
        }
    }

    $scope.goto = function(u) {
        console.log(u);
        $window.location.href = u;
    }

}]);