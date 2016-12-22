import {inject} from 'aurelia-framework';
import moment from 'moment';
import {Core} from 'core';

//  sample usage
//  ${currentDate | date:'MMM DD YYYY'}

@inject(Core)
export class DateValueConverter {

    constructor(core) {
        this.config = core.config;
    }

    toView(value, format) {
        _.isUndefined(format) ? format = this.config.defaultFormats.date : _.noop;
        return moment(value).utc().format(format);
    }

}