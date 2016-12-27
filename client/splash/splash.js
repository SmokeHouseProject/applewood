import {inject} from 'aurelia-dependency-injection';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {Repository} from 'data/repository';
import {Core} from 'core';

@inject(CommonDialogs, Repository, Core)
export class Splash {

    constructor(commonDialogs, dr, core) {
   
        let tokenName = core.config.authApi.tokenPrefix + '_' + core.config.authApi.tokenName;

        this.commonDialogs = commonDialogs;
    
        // initialize data repository
        // so that it responds to login logout events
        this.dr = dr;

        // clean up local storage
        // NOTE: This is currently required because 
        //       Aurelia child router does not always fire 
        //       unknownRoute resolver correctly
        localStorage.removeItem('CurrentUser');
        localStorage.removeItem('tokenName');

    }

    login() {
        return this.commonDialogs.login();
    }

}