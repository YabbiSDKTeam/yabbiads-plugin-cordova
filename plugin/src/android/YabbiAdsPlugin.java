package cordova.plugin.yabbiads;

import android.app.Activity;
import android.util.Log;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import me.yabbi.ads.YabbiAds;
import me.yabbi.ads.YabbiConfiguration;
import me.yabbi.ads.YbiInterstitialListener;
import me.yabbi.ads.YbiRewardedListener;

/**
 * This class echoes a string called from JavaScript.
 */
public class YabbiAdsPlugin extends CordovaPlugin implements YbiInterstitialListener, YbiRewardedListener {

    private Activity getCurrentActivity() {
        return cordova.getActivity();
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    private void initialize(final String publisherId, final String interstitialId, final String rewardedId, final CallbackContext callbackContext) throws JSONException {
        getCurrentActivity().runOnUiThread( () -> {
            // Check if Activity is available
            Activity activity = getCurrentActivity();
            if (activity == null) throw new IllegalStateException("No Activity found");

            final YabbiConfiguration config = new YabbiConfiguration(publisherId, interstitialId, rewardedId);
            YabbiAds.initialize(activity, config);
            YabbiAds.setInterstitialListener(this);
            YabbiAds.setRewardedListener(this);
            callbackContext.success(getInitializationMessage());
        });

    }

    private JSONObject getInitializationMessage() {
        JSONObject message = new JSONObject();
        try {
            message.put("hasUserConsent", YabbiAds.hasUserConsent());
        } catch (JSONException ignored) {
        }

        return message;
    }

    public void setUserConsent(final boolean hasConsent, final CallbackContext callbackContext) {
        YabbiAds.setUserConsent(hasConsent);
        callbackContext.success();
    }

    public void loadAd(final int adType, final CallbackContext callbackContext) {
        // Check if Activity is available
        Activity activity = getCurrentActivity();
        if (activity == null) throw new IllegalStateException("No Activity found");

        YabbiAds.loadAd(activity, adType);
        callbackContext.success();
    }

    public void showAd(final int adType, final CallbackContext callbackContext) {
        // Check if Activity is available
        Activity activity = getCurrentActivity();
        if (activity == null) throw new IllegalStateException("No Activity found");

        YabbiAds.showAd(activity, adType);
        callbackContext.success();
    }

    public void destroyAd(final int adType, final CallbackContext callbackContext) {
        YabbiAds.destroyAd(adType);
        callbackContext.success();
    }

    public void setCustomParams(final String key, final String value, final CallbackContext callbackContext) {
        YabbiAds.setCustomParams(key, value);
        callbackContext.success();
    }

    // React Native Bridge
    private void fireWindowEvent(final String name, final JSONObject params) {
        JSONObject data = params == null ? new JSONObject() : params;
        getCurrentActivity().runOnUiThread(() -> webView.loadUrl("javascript:cordova.fireWindowEvent('" + name + "', " + data + ");"));
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("initialize".equalsIgnoreCase(action)) {
            final String publisherId = args.getString(0);
            final String interstitialId = args.getString(1);
            final String rewardedId = args.getString(2);
            initialize(publisherId, interstitialId, rewardedId, callbackContext);
        } else if ("setUserConsent".equalsIgnoreCase(action)) {
            final boolean hadConsent = args.getBoolean(0);
            setUserConsent(hadConsent, callbackContext);
        } else if ("loadAd".equalsIgnoreCase(action)) {
            final int adType = args.getInt(0);
            loadAd(adType, callbackContext);
        } else if ("showAd".equalsIgnoreCase(action)) {
            final int adType = args.getInt(0);
            showAd(adType, callbackContext);
        } else if ("destroyAd".equalsIgnoreCase(action)) {
            final int adType = args.getInt(0);
            destroyAd(adType, callbackContext);
        } else if ("setCustomParams".equalsIgnoreCase(action)) {
            final String key = args.getString(0);
            final String value = args.getString(1);
            setCustomParams(key, value, callbackContext);
        } else {
            return false;
        }

        return true;
    }

    @Override
    public void onInterstitialLoaded() {
        fireWindowEvent("onInterstitialLoaded", null);
    }

    @Override
    public void onInterstitialLoadFail(String error) {
        try {
            JSONObject params = new JSONObject();
            params.put("error", error);
            fireWindowEvent("onInterstitialLoadFail", params);
        } catch (Throwable ignored) {
        }
    }

    @Override
    public void onInterstitialShown() {
        fireWindowEvent("onInterstitialShown", null);
    }

    @Override
    public void onInterstitialShowFailed(String error) {
        try {
            JSONObject params = new JSONObject();
            params.put("error", error);
            fireWindowEvent("onInterstitialShowFailed", params);
        } catch (Throwable ignored) {
        }
    }

    @Override
    public void onInterstitialClosed() {
        fireWindowEvent("onInterstitialClosed", null);
    }

    @Override
    public void onRewardedLoaded() {
        fireWindowEvent("onRewardedLoaded", null);
    }

    @Override
    public void onRewardedLoadFail(String error) {
        try {
            JSONObject params = new JSONObject();
            params.put("error", error);
            fireWindowEvent("onRewardedLoadFail", params);
        } catch (Throwable ignored) {
        }
    }

    @Override
    public void onRewardedShown() {
        fireWindowEvent("onRewardedShown", null);
    }

    @Override
    public void onRewardedShowFailed(String error) {
        try {
            JSONObject params = new JSONObject();
            params.put("error", error);
            fireWindowEvent("onRewardedShowFailed", params);
        } catch (Throwable ignored) {
        }
    }

    @Override
    public void onRewardedClosed() {
        fireWindowEvent("onRewardedClosed", null);
    }

    @Override
    public void onRewardedFinished() {
        fireWindowEvent("onRewardedFinished", null);
    }
}

