starz.directive('videoThumb', [function () {

    /* Requires jQuery */

    var height;

    function link(scope, element, attr) {
        var $e = $(element);

        //var $i = $e.children('.videoImage');
        var $t = $e.children('.videoText');

        $t.css({
            position: 'absolute',
            bottom: '0',
            width: '100%'
        });

        /* Add mobile screen conditional to handle UI changes */
        $t.hide();

        $e.mouseenter(function () {
            $t.stop().fadeTo('fast', 1);
        });

        $e.mouseleave(function () {
            $t.stop().fadeTo('fast', 0);
        });
    }

    return {
        restrict: 'A',
        templateUrl: 'templates/videoThumb.html',
        scope: {
            video: '='
        },
        link: link
    }

}]);