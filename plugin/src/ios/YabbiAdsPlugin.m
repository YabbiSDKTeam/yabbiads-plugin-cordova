/********* YabbiAdsPlugin.m Cordova Plugin Implementation *******/

#import "YabbiAdsPlugin.h"
#define ROOT_VIEW_CONTROLLER (self.viewController)


@interface YabbiAdsPlugin()<YbiInterstitialDelegate, YbiRewardedDelegate>


@end


@implementation YabbiAdsPlugin

- (void)initialize:(CDVInvokedUrlCommand *)command
{
    
    NSString *publisherID = [command argumentAtIndex: 0];
    NSString *interstitialID = [command argumentAtIndex: 1];
    NSString *rewardedID = [command argumentAtIndex: 2];
    
    YabbiConfiguration *configuration = [[YabbiConfiguration alloc] initWithPublisherID:publisherID interstitialID:interstitialID rewardedID:rewardedID];
    
    [YabbiAds initialize:configuration];
    [YabbiAds setInterstitialDelegate:self];
    [YabbiAds setRewardedDelegate:self];

    CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsDictionary: [self initializationMessage]];
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

}

- (NSDictionary<NSString *, id> *)initializationMessage
{
    NSMutableDictionary<NSString *, id> *message = [NSMutableDictionary dictionaryWithCapacity: 4];
    
    message[@"hasUserConsent"] = @([YabbiAds hasUserConsent]);
    
    return message;
}

- (void)setUserConsent:(CDVInvokedUrlCommand *)command
{
    BOOL hasConsent = ((NSNumber *)[command argumentAtIndex: 0]).boolValue;
    
    [YabbiAds setUserConsent:hasConsent];

    [self sendOKPluginResultForCommand: command];
}

- (void)loadAd:(CDVInvokedUrlCommand *)command
{
    int adType = ((NSNumber *)[command argumentAtIndex: 0]).intValue;
    
    [YabbiAds loadAd:adType];
    [self sendOKPluginResultForCommand: command];
}

- (void)showAd:(CDVInvokedUrlCommand *)command
{
    int adType = ((NSNumber *)[command argumentAtIndex: 0]).intValue;

    [YabbiAds showAd:adType :ROOT_VIEW_CONTROLLER];
    [self sendOKPluginResultForCommand: command];
}

- (void)destroyAd:(CDVInvokedUrlCommand *)command
{
    int adType = ((NSNumber *)[command argumentAtIndex: 0]).intValue;

    [YabbiAds destroyAd:adType];
    [self sendOKPluginResultForCommand: command];
}

- (void)setCustomParams:(CDVInvokedUrlCommand *)command
{
    NSString *key = [command argumentAtIndex: 0];
    NSString *value = [command argumentAtIndex: 1];

    [YabbiAds setCustomParams:key :value];
    [self sendOKPluginResultForCommand: command];
}

- (void)sendOKPluginResultForCommand:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult: result callbackId: command.callbackId];
}

- (void)fireWindowEventWithName:(NSString *)name body:(NSDictionary<NSString *, id> *)body
{
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject: body options: 0 error: nil];

    
    NSString *jsonStr = [[NSString alloc] initWithData: jsonData encoding: NSUTF8StringEncoding];
    NSString *js = [NSString stringWithFormat: @"cordova.fireWindowEvent('%@', %@)", name, jsonStr];
    [self.commandDelegate evalJs: js];
}

- (NSDictionary<NSString *, id> *)createAdInfo:(NSString *)error
{
    return @{@"error" : error};
}

- (void)onInterstitialClosed {
    [self fireWindowEventWithName: @"onInterstitialClosed" body: [self createAdInfo: @""]];
}

- (void)onInterstitialLoadFailed:(NSString * _Nonnull)error {
    [self fireWindowEventWithName: @"onInterstitialLoadFailed" body: [self createAdInfo: error]];
}

- (void)onInterstitialLoaded {
    [self fireWindowEventWithName: @"onInterstitialLoaded" body: [self createAdInfo: @""]];
}

- (void)onInterstitialShowFailed:(NSString * _Nonnull)error {
    [self fireWindowEventWithName: @"onInterstitialShowFailed" body: [self createAdInfo: error]];
}

- (void)onInterstitialShown {
    [self fireWindowEventWithName: @"onInterstitialShown" body: [self createAdInfo: @""]];
}

- (void)onRewardedClosed {
    [self fireWindowEventWithName: @"onRewardedClosed" body: [self createAdInfo: @""]];
}

- (void)onRewardedFinished {
    [self fireWindowEventWithName: @"onRewardedFinished" body: [self createAdInfo: @""]];
}

- (void)onRewardedLoadFailed:(NSString * _Nonnull)error {
    [self fireWindowEventWithName: @"onRewardedLoadFailed" body: [self createAdInfo: error]];
}

- (void)onRewardedLoaded {
    [self fireWindowEventWithName: @"onRewardedLoaded" body: [self createAdInfo: @""]];
}

- (void)onRewardedShowFailed:(NSString * _Nonnull)error {
    [self fireWindowEventWithName: @"onRewardedShowFailed" body: [self createAdInfo: error]];
}

- (void)onRewardedShown {
    [self fireWindowEventWithName: @"onRewardedShown" body: [self createAdInfo: @""]];
}

@end