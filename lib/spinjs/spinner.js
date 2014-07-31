/* Requires spin.min.js */

var SpinGen = (function () {

    var opts = {
            lines: 15, // The number of lines to draw
            length: 0, // The length of each line
            width: 8, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 16, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#000', // #rgb or #rrggbb or array of colors
            speed: 1.3, // Rounds per second
            trail: 61, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent in px
            left: '50%' // Left position relative to parent in px
        };

    function createNew(t) {
        if(t) {
            return true;
        } else {
            var spin = (function () {
                var s = new Spinner(opts);
                var target;

                function spin(e) {
                    target = document.getElementById(e);
                    s.spin(target);
                }

                function stop() {
                    s.stop();
                }

                return {
                    start: spin,
                    stop: stop
                };

            })();

            return spin;
        }
    }

    return {
        newSpinner: createNew
    };

})();