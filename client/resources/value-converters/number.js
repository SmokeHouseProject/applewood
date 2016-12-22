import {inject} from 'aurelia-framework';
import numeral from 'numeral';
import {Core} from 'core';

//  sample usage
//  ${dollarAmount | number:'$0,0.00'} 

@inject(Core)
export class NumberValueConverter {

    constructor(core) {
        this.config = core.config;
    }

    toView(value, format) {
        _.isUndefined(format) ? format = this.config.defaultFormats.number : _.noop;
        return numeral(value).format(format);
    }
}