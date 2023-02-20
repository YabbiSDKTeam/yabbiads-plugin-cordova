document.addEventListener('deviceready', onDeviceReady, false);

var YabbiAds;

function onDeviceReady() {
    YabbiAds = cordova.require('cordova.plugin.yabbiads.YabbiAdsPlugin');
    _init();
}

function _init() {
    YabbiAds.initialize(EnvVariables.YABBI_PUBLISHER_ID, EnvVariables.YABBI_INTERSTITIAL_ID, EnvVariables.YABBI_REWARDED_ID);

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('load_interstitial').addEventListener("click", _loadInterstitial);
    document.getElementById('show_interstitial').addEventListener("click", _showInterstitial);
    document.getElementById('destroy_interstitial').addEventListener("click", _destroyInterstitial);
    document.getElementById('load_rewarded').addEventListener("click", _loadRewarded);
    document.getElementById('show_rewarded').addEventListener("click", _showRewarded);
    document.getElementById('destroy_rewarded').addEventListener("click", _destroyRewarded);

}

function _loadInterstitial() {
    console.log("_loadInterstitial");
}

function _showInterstitial() {
    console.log("_showInterstitial");
}

function _destroyInterstitial() {
    console.log("_destroyInterstitial");
}

function _loadRewarded() {
    console.log("_loadRewarded");
}

function _showRewarded() {
    console.log("_showRewarded");
}

function _destroyRewarded() {
    console.log("_destroyRewarded");
}
