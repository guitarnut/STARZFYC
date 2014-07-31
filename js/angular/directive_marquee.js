'use strict';

starz.controller('MarqueeController', ['$rootScope', '$scope', '$route', '$routeParams', 'SiteData', function ($rootScope, $scope, $route, $routeParams, SiteData) {

    //Grab the content id from the url when the location changes
    function setImageSource() {
        if ($rootScope.status.data) {
            if ($routeParams.originalId != undefined) {
                $scope.original = $routeParams.originalId;
            } else {
                $scope.original = 'homepage';
            }

            $scope.images = SiteData.getMarqueeImages($scope.original);
        }
    }

    //Change the content when the user navigates
    $scope.$on('$routeChangeSuccess', function () {
        //Don't fire early, wait for data to load
        if ($rootScope.status.data)setImageSource();
    });

    //Check to see if data exists for this show, and load images if it does
    $rootScope.$watch('status.data', function () {
        if ($rootScope.status.data) {
            setImageSource();
        }
    });

}]);

starz.directive('marqueeGallery', [function () {

    /* jQuery required */

    var images,
        imgProgress,
        imgTimer,
        userInteraction,
        imgCount,
        delay = 8000,
        navOpacity = 0.5;
    //Current image
    var c;
    //Next image
    var n;
    //Current progress
    var cp;
    //Next progress
    var np;

    //Watch for changes in the scope and reload the gallery
    function link(scope, element, attr) {
        setupNav(element);

        //Watch the images
        scope.$watch('images', function () {
            clearInt();
            images = [];
            imgProgress = [];
            imgCount = 0;

            resetGallery(element);
        });
    }

    //Handle image swapping times and user interaction times
    function clearInt() {
        if (imgTimer)clearInterval(imgTimer);
    }

    function startInt() {
        imgTimer = setInterval(function () {
            nextImage();
        }, delay);
    }

    function startInteractionTimer() {
        if (!userInteraction)userInteraction = setTimeout(function () {
            startInt();
            userInteraction = null;
        }, 1000);
    }

    //Nav button functionality
    function setupNav(e) {
        $(e).children('.marqueeNav').each(function () {
            var n = $(this);

            n.fadeTo('fast', navOpacity);

            n.mouseover(function () {
                n.stop().fadeTo('fast', 1);
            });

            n.mouseout(function () {
                n.stop().fadeTo('fast', navOpacity);
            });
        });

        $('.marqueeNav').click(function () {
            clearInt();
            startInteractionTimer();
        });

        $('#navLeft').click(function () {
            previousImage();
        });

        $('#navRight').click(function () {
            nextImage();
        });
    }

    //Setup a new gallery
    function resetGallery(e) {
        var d = $(e);

        //Image marquees
        d.children('.marqueeImage').each(function () {
            images.push($(this));
        });

        d.children('.marqueeImage').hide();
        d.children('.taOverlay').hide();

        $(images[0]).fadeTo('fast', 1);

        //Image progress icons
        $('#progress').children('img').each(function () {
            var i = $(this);
            imgProgress.push(i);
            i.fadeTo('fast', .5);
        });

        $(imgProgress[0]).fadeTo('fast', 1);

        startInt();
    }

    //Image animation and advance/back features
    function previousImage() {
        //Set next image
        n = images[countBack()];
        np = imgProgress[countBack()];
        swapImages(-1);
    }

    function nextImage() {
        //Set next image
        n = images[countForward()];
        np = imgProgress[countForward()];
        swapImages(1);
    }

    function swapImages(i) {
        $(c).stop().fadeTo('fast', 0, function () {
            $(this).hide();
            $(cp).stop().fadeTo('fast', 0.5);

            $(n).fadeTo('fast', 1);
            $(np).fadeTo('fast', 1);

            imgCount = imgCount + i;

            if (imgCount === images.length) imgCount = 0;
            if (imgCount < 0) imgCount = images.length - 1;
        })
    }

    function countBack() {
        c = images[imgCount];
        cp = imgProgress[imgCount];

        var i = imgCount - 1;
        if (i < 0) i = images.length - 1;

        return i;
    }

    function countForward() {
        c = images[imgCount];
        cp = imgProgress[imgCount];

        var i = imgCount + 1;
        if (i === images.length) i = 0;

        return i;
    }

    return {
        restrict: 'A',
        templateUrl: 'templates/marqueeGallery.html',
        link: link,
        controller: 'MarqueeController'
    }

}]);