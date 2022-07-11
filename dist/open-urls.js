(function() {
    'use strict';

    var exports = {};

    exports.open = function(arr, interval) {
        var i;
        if (typeof(interval) === "undefined") {
            interval = 0;
        }
        for (i = 0; i < arr.length; i++) {
            (function(url, n) {
                setTimeout(function() {
                    window.open(url, '_blank');
                }, n);
            })(arr[i], interval * i);
        }
    }

    if (typeof(window.openUrls) === "undefined") {
        window.openUrls = exports;
    }
})();