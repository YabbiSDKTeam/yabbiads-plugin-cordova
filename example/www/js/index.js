document.addEventListener('deviceready', onDeviceReady, false);

var YabbiAds;

const AdType = {
    INTERSTITIAL: 1,
    REWARDED: 3,
};

function onDeviceReady() {
    YabbiAds = cordova.require('cordova.plugin.yabbiads.YabbiAdsPlugin');
    _init();
}

function _init() {
    YabbiAds.initialize(EnvVariables.YABBI_PUBLISHER_ID, EnvVariables.YABBI_INTERSTITIAL_ID, EnvVariables.YABBI_REWARDED_ID);
    YabbiAds.setUserConsent(true);

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('load_interstitial').addEventListener("click", _loadInterstitial);
    document.getElementById('show_interstitial').addEventListener("click", _showInterstitial);
    document.getElementById('destroy_interstitial').addEventListener("click", _destroyInterstitial);
    document.getElementById('load_rewarded').addEventListener("click", _loadRewarded);
    document.getElementById('show_rewarded').addEventListener("click", _showRewarded);
    document.getElementById('destroy_rewarded').addEventListener("click", _destroyRewarded);

    _initializeInterstitialListener();
    _initializeRewardedListener();

}

function _initializeInterstitialListener() {
    window.addEventListener('onInterstitialLoaded', function (adInfo) {
        _logEvent('onInterstitialLoaded');
    });
    window.addEventListener('onInterstitialLoadFailed', function (adInfo) {
        _logEvent(`onInterstitialLoadFailed - ${adInfo.error}`);
    });
    window.addEventListener('onInterstitialShown', function (adInfo) {
        _logEvent('onInterstitialShown');
    });
    window.addEventListener('onInterstitialShowFailed', function (adInfo) {
        _logEvent(`onInterstitialShowFailed - ${adInfo.error}`);
    });
    window.addEventListener('onInterstitialClosed', function (adInfo) {
        _logEvent('onInterstitialClosed');
    });
}


function _initializeRewardedListener() {
    window.addEventListener('onRewardedLoaded', function (adInfo) {
        _logEvent('onRewardedLoaded');
    });
    window.addEventListener('onRewardedLoadFailed', function (adInfo) {
        _logEvent(`onRewardedLoadFailed - ${adInfo.error}`);
    });
    window.addEventListener('onRewardedShown', function (adInfo) {
        _logEvent('onRewardedShown');
    });
    window.addEventListener('onRewardedShowFailed', function (adInfo) {
        _logEvent(`onRewardedShowFailed - ${adInfo.error}`);
    });
    window.addEventListener('onRewardedClosed', function (adInfo) {
        _logEvent('onRewardedClosed');
    });
    window.addEventListener('onRewardedFinished', function (adInfo) {
        _logEvent('onRewardedFinished');
    });
}

function _loadInterstitial() {
    YabbiAds.loadAd(AdType.INTERSTITIAL);
}

function _showInterstitial() {
    YabbiAds.showAd(AdType.INTERSTITIAL);
}

function _destroyInterstitial() {
    YabbiAds.destroyAd(AdType.INTERSTITIAL);
}

function _loadRewarded() {
    YabbiAds.loadAd(AdType.REWARDED);
}

function _showRewarded() {
    YabbiAds.showAd(AdType.REWARDED);
}

function _destroyRewarded() {
    YabbiAds.destroyAd(AdType.REWARDED);
}

function _logEvent(message) {
    var logger = document.getElementById('logger');
    logger.textContent = `${logger.innerHTML}\n ${message}`;
}