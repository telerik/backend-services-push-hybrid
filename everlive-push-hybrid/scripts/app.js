(function (global) {
    'use strict';

    var app = global.app = global.app || {};
    
    app.everlive = new Everlive({
        appId: app.config.everlive.appId,
        scheme: app.config.everlive.scheme
    });
        
    var fixViewResize = function () {
        
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };

    var onDeviceReady = function() {

        navigator.splashscreen.hide();
        
        if (!app.isKeySet(app.config.everlive.appId)) {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noappid-scrn').html(app.constants.NO_APP_ID_MESSAGE);
            return;
        } else if (!app.isKeySet(app.androidProjectNumber) && device.platform.toLowerCase() === 'android') {
            $(app.config.views.init).hide();
            $('#pushApp').addClass('noappid-scrn').html(app.constants.NO_GOOGLE_API_PROJECT_NUMBER);
            return;
        }
        
        fixViewResize();

        var os = kendo.support.mobileOS,
        	statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

        app.mobile = new kendo.mobile.Application(document.body, {
            transition: 'slide',
            statusBarStyle: statusBarStyle,
            skin: 'flat'
        });
    };

    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('orientationchange', fixViewResize);

}(window));
