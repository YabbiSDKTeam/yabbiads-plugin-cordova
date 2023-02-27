var exec = require('cordova/exec');
var cordova = require('cordova');

const _VERSION = '1.0.5';

function _isFunction(functionObj) {
    return typeof functionObj === 'function';
}

function _callNative(name, params = [], successCallback = null, errorCallback = null) {
    cordova.exec(successCallback, errorCallback, 'YabbiAdsPlugin', name, params);
}


const _AdType = {
    INTERSTITIAL: 1,
    REWARDED: 3,
};


var YabbiAds = {

    version: _VERSION,

    // NOTE: We have to store states in JS as workaround for callback-based API
    // since Cordova does not allow for synchronous returns
    initialized: false,
    hasUserConsentValue: false,
    canLoadInterstitial: false,
    canLoadRewarded: false,
    isInterstitialLoaded: false,
    isRewardedLoaded: false,


    initialize: function (publisherId, interstitialId, rewardedId) {
        _callNative('initialize', [publisherId, interstitialId, rewardedId], function (config) {
            this.initialized = true;
            this.hasUserConsentValue = config.hasUserConsent;
            if (publisherId) {
                if (interstitialId) {
                    this.canLoadInterstitial = true;
                }

                if (rewardedId) {
                    this.canLoadRewarded = true;
                }
            }
        });
    },

    isInitialized: function () {
        return this.initialized;
    },

    setUserConsent: function (hasUserConsent) {
        this.hasUserConsentValue = hasUserConsent;
        _callNative('setUserConsent', [hasUserConsent]);
    },

    hasUserConsent: function () {
        return this.hasUserConsentValue;
    },

    loadAd: function (adType) {
        _callNative('loadAd', [adType]);
    },

    showAd: function (adType) {
        _callNative('showAd', [adType]);
    },

    destroyAd: function (adType) {
        switch (adType) {
            case _AdType.INTERSTITIAL:
                this.canLoadInterstitial = true;
                this.isInterstitialLoaded = false;
                break;
            case _AdType.REWARDED:
                this.canLoadRewarded = true;
                this.isRewardedLoaded = false;
                break;
        }

        _callNative('destroyAd', [adType]);
    },

    setCustomParams(key, value) {
        _callNative('setCustomParams', [key, value]);
    },

    canLoadAd(adType) {
        switch (adType) {
            case _AdType.INTERSTITIAL:
                return this.canLoadInterstitial;
            case _AdType.REWARDED:
                return this.canLoadRewarded;
            default:
                return false;
        }
    },

    isAdLoaded(adType) {
        switch (adType) {
            case _AdType.INTERSTITIAL:
                return this.isInterstitialLoaded;
            case _AdType.REWARDED:
                return this.isRewardedLoaded;
            default:
                return false;
        }
    }
}


window.addEventListener('onInterstitialLoaded', function (adInfo) {
    YabbiAds.canLoadInterstitial = false;
    YabbiAds.isInterstitialLoaded = true;
});
window.addEventListener('onInterstitialShown', function (adInfo) {
    YabbiAds.canLoadInterstitial = true;
    YabbiAds.isInterstitialLoaded = false;
});

window.addEventListener('onRewardedLoaded', function (adInfo) {
    YabbiAds.canLoadRewarded = false;
    YabbiAds.isRewardedLoaded = true;
});
window.addEventListener('onRewardedShown', function (adInfo) {
    YabbiAds.canLoadRewarded = true;
    YabbiAds.isRewardedLoaded = false;
});



if (typeof module !== undefined && module.exports) {
    module.exports = YabbiAds;
}