# YabbiAds Cordova Plugin

YabbiAds Cordova Plugin for Android and iOS.



## Ошибка сборки iOS

При установке iOS может возникнуть ошибка:

`WKJavaScriptController` does not specify a Swift version and none of the targets (`HelloCordova`) integrating it have the `SWIFT_VERSION` attribute set. Please contact the author or set the `SWIFT_VERSION` attribute in at least one of the targets that integrate this pod.

Для устранения ошибки введите в терминале команду `cordova prepare`. Затем перейдите в папку your_app/platforms/ios. И сделайте `pod install`.