import {inject} from 'aurelia-dependency-injection';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {Repository} from 'data/repository';

@inject(CommonDialogs, Repository)
export class Splash {

    constructor(commonDialogs, dr) {
   
        this.commonDialogs = commonDialogs;
    
        // initialize data repository
        // so that it responds to login logout events
        this.dr = dr;
    }

    login() {
        return this.commonDialogs.login();
    }

}