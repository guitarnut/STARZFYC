'use strict';

//The BCL instances are declared in the Brightcove.js file. This service manages playlist and video instances after they are declared.
starz.service('VideoPlayer', ['$rootScope', function ($rootScope) {

    var attempts = 0

    function loadPlaylist(p) {
        BC.contentModule.getPlaylistByID(p, function (jsonData) {
            //Handle null return
            if (jsonData === null) {
                attempts++;

                console.log('Reloading, attempt ' + attempts);

                setTimeout(function () {
                    loadPlaylist(p);
                }, 500);

            } else {
                attempts = 0;
                $rootScope.$broadcast('playlistReady', jsonData);
            }
        });
    }

    function checkInit() {
        return init;
    }

    function playVideo(v) {
        BC.videoPlayer.loadVideoByID(v);
    }

    return {
        loadPlaylist: loadPlaylist,
        playVideo: playVideo,
        initialized: checkInit
    }

}]);