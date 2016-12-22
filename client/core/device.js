import {State} from './state/state';

//identify data object
const _objName= 'Device';

export class Device extends State {

    constructor() {
        super(_objName);

        if (typeof device !== 'undefined') {
            //load values from cordova plugin
            this.platform = device.platform;
            this.model = device.model;
        } else {
            this.platform = 'browser';
            this.model = getBrowser();
        } 

        //save the object state to local store
        this.persist();
    }

    initialize() {
        //inject device specific class for overall styling
        let newClass = this.platform === 'browser' ? this.model : this.platform;
        let classes = document.getElementsByTagName('body')[0].classList;
        if (!classes.contains(newClass)) {
            classes.add(newClass);
        }

    }

    persist() {
        //list the properties to persist
        super.setState(['platform','model']);
    }

}


function getBrowser() {

    let browser;

    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    // At least Safari 3+: "[object HTMLElementConstructor]"
    let isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Chrome 1+
    let isChrome = !!window.chrome && !isOpera;

    // At least IE6
    let isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;

    return browser =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        'Unknown';
}