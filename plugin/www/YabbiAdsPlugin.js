var exec = require('cordova/exec');
var cordova = require('cordova');

function isFunction(functionObj) {
    return typeof functionObj === 'function';
}

function callNative(name, params = [], successCallback = null, errorCallback = null) {
    cordova.exec(successCallback, errorCallback, 'AppLovinMAX', name, params);
}


var YabbiAds = {
    initialize: function (publisherId, interstitialId, rewardedId) {
        console.log("YabbiAds.initialize")
    }
}



if (typeof module !== undefined && module.exports) {
    module.exports = YabbiAds;
}