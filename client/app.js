import {inject} from 'aurelia-dependency-injection';
import {FetchConfig} from 'aurelia-auth';
import AppRouterConfig from 'router-config';
import {Core} from 'core';
import _ from 'lodash';

@inject(FetchConfig, AppRouterConfig, Core)
export class App {
    
    constructor(fetchConfig, appRouterConfig, core) {

        this.core = core;       
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;

    }

    activate() {
        this.core.initialize();
        this.fetchConfig.configure();
        this.appRouterConfig.configure();
    }

}
