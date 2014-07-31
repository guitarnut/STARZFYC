'use strict';

starz.service('SiteData', ['$rootScope', '$q', '$timeout', '$http', function ($rootScope, $q, $timeout, $http) {

    //Store data here. Service is a singleton.
    var d;

    function loadData() {

        var deferred = $q.defer();

        $timeout(function () {
            $http.get('js/sitedata.json').success(function (data) {
                deferred.resolve(data);
                d = data;
                $rootScope.status.data = true;
            })
        }, 30);
    }

    //All the below methods become available when the data is loaded and 'status.data' is set to 'true'

    function getShow(s) {
        var showData;

        for (var k in d['originals']) {

            if (String(d['originals'][k].id) === String(s)) {
                showData = d['originals'][k];
            }

        }

        //Sends back a null value if no match is found
        return showData;
    }

    function getShows() {
        return d['originals'];
    }

    function getNav() {

        var nav = {};

        for (var k in d['originals']) {
            //Store the show name and id in the link data
            nav[k] = {
                name: d['originals'][k].name,
                href: d['originals'][k].id
            };
        }

        return nav;
    }

    function getMarqueeImages(s) {
        var imageData;

        for (var k in d['originals']) {

            if (String(d['originals'][k].id) === String(s)) {
                imageData = d['originals'][k].gallery;
            }

        }

        return imageData;
    }

    return {
        loadData: loadData,
        getShow: getShow,
        getShows: getShows,
        getNav: getNav,
        getMarqueeImages: getMarqueeImages
    }

}]);