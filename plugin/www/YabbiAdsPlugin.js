var exec = require('cordova/exec');
var cordova = require('cordova');

const VERSION = '1.0.0';

function isFunction(functionObj) {
    return typeof functionObj === 'function';
}

function callNative(name, params = [], successCallback = null, errorCallback = null) {
    cordova.exec(successCallback, errorCallback, 'YabbiAdsPlugin', name, params);
}


var YabbiAds = {

    // NOTE: We have to store states in JS as workaround for callback-based API
    // since Cordova does not allow for synchronous returns
    initialized: false,
    hasUserConsentValue: null,
    version: VERSION,


    initialize: function (publisherId, interstitialId, rewardedId) {
        callNative('initialize', [publisherId, interstitialId, rewardedId], function (config) {
            YabbiAds.initialized = true;
            YabbiAds.hasUserConsentValue = config.hasUserConsent;
        });
    },

    isInitialized: function () {
        return this.initialized;
    },

    setUserConsent: function (hasUserConsent) {
        this.hasUserConsentValue = hasUserConsent;
        callNative('setUserConsent', [hasUserConsent]);
    },

    hasUserConsent: function () {
        return this.hasUserConsentValue;
    },

    loadAd: function (adType) {
        callNative('loadAd', [adType]);
    },

    showAd: function (adType) {
        callNative('showAd', [adType]);
    },

    destroyAd: function (adType) {
        callNative('destroyAd', [adType]);
    },

    setCustomParams(key, value) {
        callNative('setCustomParams', [key, value]);
    },

    canLoadAd(adType, callback) {
        callNative('canLoadAd', [adType], function (canLoad) {
            if (isFunction(callback)) {
                callback(canLoad);
            }
        });
    },

    isAdLoaded(adType, callback) {
        callNative('isAdLoaded', [adType], function (isLoaded) {
            if (isFunction(callback)) {
                callback(isLoaded);
            }
        });
    }
}

if (typeof module !== undefined && module.exports) {
    module.exports = YabbiAds;
}