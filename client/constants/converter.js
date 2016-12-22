import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class Converter {

    constructor(i18n) {
        this.i18n = i18n;
    }

    toNameValuePairs(constant, constantName) {
        let result = [];
        let name = '';
        _.forIn(constant, (value, key) => {
            name = this.i18n.tr(constantName + '.' + key);
            result.push({ name: name, value: value });
        });
        return result;
    }

}