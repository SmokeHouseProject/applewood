import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Permissions} from './permissions';

@inject(Router)
export default class {

  constructor(router, i18n) {
      this.router = router;
  };

  configure() {
  
      var appRouterConfig = function(config) {

      config.title = 'Applewood';
      config.addPipelineStep('authorize', AuthorizeStep);
      config.addPipelineStep('authorize', Permissions);

      config.map([
          { route: ['','splash'], name: 'splash', moduleId: 'splash/splash', nav: false, authRoute: true  },
          { route: 'home', name: 'home', moduleId: 'home/home', nav: true, auth: true },
          { route: 'logout', name: 'logout', moduleId: 'logout', nav: false, authRoute: true },
          { route: 'noaccess', name: 'noaccess', moduleId: 'noaccess', nav: false },
          { route: 'root', name: 'root', redirect: ''}
        ]);   
    };

    this.router.configure(appRouterConfig);

  };
}