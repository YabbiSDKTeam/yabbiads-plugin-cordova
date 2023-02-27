# YabbiAds Cordova Plugin

## Руководство по Интеграции

Версия релиза **1.0.5** | Дата релиза **27.02.2023**

> Минимальные требования:
>
>* Используйте Android API level 19 (Android OS 4.4) и выше.
>* iOS 12.0 или выше.
>* Используйте XCode 13 и выше.

## Демо приложение
Используйте наше [демо приложение](https://github.com/YabbiSDKTeam/yabbiads-plugin-cordova/tree/master/example) в качестве примера. 

## Установка SDK

Установите плагин в ваш проект. Для этого используйте в терминале команду написанную ниже.

```bash
 cordova plugin add cordova.plugin.yabbiads  
```
Теперь наш плагин установлен и готов к использованию.

## Инициализация SDK
Мы рекомендуем вызывать инициализацию SDK в вызове слушателя `deviceready`.

Вы можете указывать доступные настройки SDK с поомощью метода `setCustomParams`.

Ниже представлен код инициализирующий плагин в приложении. Скопируйте его к себе в проект и замените идентификаторы.

```js
var YabbiAds = cordova.require('cordova.plugin.yabbiads.YabbiAdsPlugin');
YabbiAds.initialize('publisher_id','interstitial_id', 'rewarded_id');
```
* `publisher_id` - идентификатор издателя. Обязателен для заполнения.
* `interstitial_id` - идентификатор полноэкранной рекламы. Может оставаться пустой строкой.
* `rewarded_id` - идентификатор полноэкранной рекламы с вознаграждением. Может оставаться пустой строкой.


1. Замените `publisher_id` на идентификатор издателя из [личного кабинета](https://mobileadx.ru/settings).
2. Замените `interstitial_id` на ключ соответствующий баннерной рекламе из [личного кабинета](https://mobileadx.ru).
3. Замените `rewarded_id` на ключ соответствующий видео с вознаграждением из [личного кабинета](https://mobileadx.ru).

Если вы не используете один из типов рекламы, вставьте вместо его идентификатора пустую строку `''`.

Вы можете проверить что плагин инициализирован с помощью метода представленного ниже.
```js
var isInitialized = YabbiAds.isInitialized();

if(isInitialized) {
 // тут ваш код
}
```

## GDPR и CCPA
**GDPR** - Это набор правил, призванных дать гражданам ЕС больше контроля над своими личными данными. Любые издатели приложений, которые созданы в ЕС или имеющие пользователей, базирующихся в Европе, обязаны соблюдать GDPR или рискуют столкнуться с большими штрафами

Для того чтобы **YabbiAds** и наши поставщики рекламы могли предоставлять рекламу, которая наиболее релевантна для ваших пользователей, как издателю мобильных приложений, вам необходимо получить явное согласие пользователей в регионах, попадающих под действие законов GDPR и CCPA.

Для предоставления согласия пользователя на сбор персональных данных используйте метод представленный ниже.

```js
YabbiAds.setUserConsent(true);
```

Чтобы проверить что плагин получил разрешения используйте метод представленный ниже.
```js
var hasConsent = YabbiAds.hasUserConsent();

if(hasConsent) {
    // Тут код
}
```


## Управление рекламой

### Типы рекламы

Вы можете подключить 2 типа рекламы в свое приложение.

* Полноэкранная реклама - баннер на весь экран, который можно закрыть через несколько секунд.
* Полноэкранная реклама с вознаграждением - видео, после просмотра которого пользователю можно выдать награду.

Для удобного использования типов рекламы создайте переменную `AdType`.

Эта переменная будет использоваться для работы с плагином.
```js
const AdType = {
    INTERSTITIAL: 1, // Полноэкранная реклама
    REWARDED: 3, // Полноэкранная реклама с вознаграждением
};
```

### Загрузка рекламы

Для загрузки рекламы используйте код представленный ниже.

Перед загрузкой мы рекомендуем проверять что рекламу можно загрузить.

* Для полноэкранной рекламы.
    ```js
    var canLoadAd = YabbiAds.canLoadAd(AdType.INTERSTITIAL);
    
    if(canLoadAd) {
        YabbiAds.loadAd(AdType.INTERSTITIAL);
    }
    ```

* Для полноэкранной рекламы с вознаграждением.
    ```js
    var canLoadAd = YabbiAds.canLoadAd(AdType.REWARDED);
    
    if(canLoadAd) {
        YabbiAds.loadAd(AdType.REWARDED);
    }
    ```

### Показ рекламы

Для показа рекламы используйте код представленный ниже.

Перед показом мы рекомендуем проверять что реклама загружена и готова к просмотру.

* Для полноэкранной рекламы.
    ```js
    var isAdLoaded = YabbiAds.isAdLoaded(AdType.INTERSTITIAL);
    
    if(isAdLoaded) {
        YabbiAds.showAd(AdType.INTERSTITIAL);
    }
    ```

* Для полноэкранной рекламы с вознаграждением.
    ```js
    var isAdLoaded = YabbiAds.isAdLoaded(AdType.REWARDED);
    
    if(isAdLoaded) {
        YabbiAds.showAd(AdType.REWARDED);
    }
    ```
    
### Уничтожение непоказанной рекламы

Если рекламу больше нет необходимости хранить в памяти, удалите ее используя следующий метод.

* Для полноэкранной рекламы.
    ```js
    YabbiAds.destroyAd(AdType.INTERSTITIAL);
    ```

* Для полноэкранной рекламы с вознаграждением.
    ```js
    YabbiAds.destroyAd(AdType.REWARDED);
    ```
    
### Отслеживание статуса рекламы.

Для отслеживания статуса рекламы необходимо добавить слушатели событий, на каждый из доступных статусов.

* Для полноэкранной рекламы.
    ```js
    window.addEventListener('onInterstitialLoaded', function (adInfo) {
        // вызывается когда реклама загружена и готова к показу.
    });
    window.addEventListener('onInterstitialLoadFailed', function (adInfo) {
        // вызывается если в загрузке рекламы произошла ошибка.
        // узнайте подробнее об ошибке используя параметр adInfo.error.
    });
    window.addEventListener('onInterstitialShown', function (adInfo) {
        // вызывается когда начался показ рекламы.
    });
    window.addEventListener('onInterstitialShowFailed', function (adInfo) {
        // вызывается если при показе рекламы произошла ошибка.
        // узнайте подробнее об ошибке используя параметр adInfo.error.
    });
    window.addEventListener('onInterstitialClosed', function (adInfo) {
        // вызывается когда реклама была закрыта пользователем.
    });
    ```

* Для полноэкранной рекламы с вознаграждением.
    ```js
    window.addEventListener('onRewardedLoaded', function (adInfo) {
        // вызывается когда реклама загружена и готова к показу.
    });
    window.addEventListener('onRewardedLoadFailed', function (adInfo) {
        // вызывается если в загрузке рекламы произошла ошибка.
        // узнайте подробнее об ошибке используя параметр adInfo.error.
    });
    window.addEventListener('onRewardedShown', function (adInfo) {
        // вызывается когда начался показ рекламы.
    });
    window.addEventListener('onRewardedShowFailed', function (adInfo) {
        // вызывается если при показе рекламы произошла ошибка.
        // узнайте подробнее об ошибке используя параметр adInfo.error.
    });
    window.addEventListener('onRewardedClosed', function (adInfo) {
        // вызывается когда реклама была закрыта пользователем.
    });
     window.addEventListener('onRewardedFinished', function (adInfo) {
        // вызывается когда реклама закончилось.
    });
    ```


## Подготовьте ваше приложение к публикации

В соответствии с [политикой Google](https://support.google.com/googleplay/android-developer/answer/9857753?hl=ru), разрешения на определения местоположения могут запрашиваться только для функций, имеющих отношение к основному функционалу приложения. Вы не можете запрашивать доступ к данным о местоположении исключительно с целью предоставления рекламы или аналитики.



**Если вы не используете местоположения как одну из основных функций вашего приложения:**
* Удалите следующий код из AndroidManifest.xml вашего приложения:
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
* Обновите приложение в Google Play. В процессе публикации убедитесь, что в Google Play Console нет предупреждений о наличии разрешения местоположения.

**Если ваше приложение использует местоположение, как одну из основных функций:**
* Заполните форму декларации разрешений на местоположение в [Google Play Console](https://play.google.com/console/u/0/developers/app/app-content/permission-declarations). Подробнее о форме декларации вы можете прочитать [здесь](https://support.google.com/googleplay/android-developer/answer/9799150?hl=en#zippy=%2Cwhere-do-i-find-the-declaration).
* Обновите приложение в Google Play. В процессе публикации убедитесь, что в Google Play Console нет предупреждений о наличии разрешения местоположения.

## Возможные ошибки

### iOS

* `WKJavaScriptController` does not specify a Swift version and none of the targets.
    
    Для устранения ошибки введите в терминале команду `cordova prepare`. Затем перейдите в папку your_app/platforms/ios. И сделайте `pod install`.


*  Ошибка при запуске `Symbol not found`:

    Перейдите в свой **Pods** таргет. Выберите из списка **WKJavaScriptController**. Перейдите во вкладку **Build Settings** и найдите в поиске параметр **Build Libraries for Distribution**. Установите значение **Yes**.  
    
    Если другие ваши зависимости не конфликтуют с параметром **Build Libraries for Distribution** вы можете добавить следующий код в свой **Podfile** проекта:
    
    ```ruby
    post_install do |installer|
        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
            end
        end
    end
    ```
    Это выставит значение **Yes** у параметра **Build Libraries for Distribution** для всех ваших pod-ов.