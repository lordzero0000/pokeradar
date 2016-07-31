module.exports = {
    getLocalization: function (callback) {
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                return callback(null, pos.coords);
            }, 
            callback, 
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }
}