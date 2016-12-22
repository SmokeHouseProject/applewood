import {bindable, bindingMode} from 'aurelia-framework';

export class Datepicker {
    @bindable({defaultBindingMode: bindingMode.twoWay}) value;

}