import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Core} from 'core';

@inject(I18N, Core)
export class Language {
    constructor(i18n, core) {
        this.i18n = i18n;
        this.core = core;
        this.languages = core.config.languages;
    }

    change(lang) {
        this.core.changeLanguage(lang);
    }

}

