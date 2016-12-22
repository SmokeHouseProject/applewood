import {bindable, bindingMode} from 'aurelia-framework';

export class Dropdown {
    @bindable({defaultBindingMode: bindingMode.twoWay}) selected;
    @bindable options;
    
}