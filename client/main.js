import environment from './environment';
import Backend from 'i18next-xhr-backend';
import Config from '../config/config';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-dialog')
    .plugin('aurelia-validation')
    //.plugin('aurelia-mobile-plugin')
    .plugin('aurelia-auth', (baseConfig) =>  {
      baseConfig.configure(Config.authApi);
    })
    .plugin('aurelia-i18n', (instance) => {
      instance.i18next.use(Backend);
      return instance.setup({
        backend: {                                 
            loadPath: './locales/{{lng}}/{{ns}}.json'
          },
        lng: 'en',
        attributes: ['t', 'i18n'],
        fallbackLng: 'en',
        debug: false
      })
    })
    .feature('mobile')
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  //delay aurelia start until cordova is intialized
  document.addEventListener('deviceready', function () {    
    aurelia.start().then(() => {
      aurelia.setRoot();
    });
  }, false);

}


