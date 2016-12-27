import {inject} from 'aurelia-framework';
import {Device} from 'core/device';
import {I18N} from 'aurelia-i18n';
import Config from '../config/config';
import moment from 'moment';
import numeral from 'numeral';
import locales from 'locales';
import {EventAggregator} from 'aurelia-event-aggregator';
import event from 'constants/events';

@inject(Device, Config, I18N, EventAggregator)
export class Core {

    constructor(device, config, i18n, ea) {
        this.device = device;
        this.config = config;
        this.i18n = i18n;
        this.ea = ea

        //map cordova events to aurelia
        document.addEventListener("pause", () => {
            _this.ea.publish(event.pause);
        }, false);

        document.addEventListener("resume", () => {
            _this.ea.publish(event.resume);
        }, false);

    }

    initialize() {
        this.device.initialize();
        this.setDefaultLanguage();
    }

    changeLanguage(lang) {
        if (lang != this.i18n.getLocale()) {
            this.i18n.setLocale(lang);
            moment.locale(lang);
            numeral.locale(lang);
            localStorage.setItem('Language', lang);
        }
    }

    setDefaultLanguage() {
        let lang;

        if (navigator.languages) {
            // chrome does not currently set navigator.language correctly https://code.google.com/p/chromium/issues/detail?id=101138
            // but it does set the first element of navigator.languages correctly
            lang = navigator.languages[0];
        } else if (navigator.userLanguage) {
            // IE only
            lang = navigator.userLanguage;
        } else {
            // as of this writing the latest version of firefox + safari set this correctly
            lang = navigator.language;
        }

        let userLanguage = localStorage.getItem('Language');
        if (userLanguage) {
            lang = userLanguage;
        } else {
            //need to convert en-* to en
            //lang = _.lowerCase(_.first(_.split(lang, '-')));
        }
  
        if (_.includes(this.config.languages, lang)) {
            this.changeLanguage(lang);
        } else {
            this.changeLanguage(_.first(this.config.languages));
        }
    }
} 

