require('shelljs/global');

//setup the web api
cd('server');
exec('npm install');
exec('node seed');
cd('..');

//build project
//exec('au build');

//set up cordova
exec('cordova platform add android');
exec('cordova platform add ios');
exec('cordova plugin add cordova-plugin-device');
exec('cordova plugin add cordova-plugin-splashscreen');
exec('cordova plugin add cordova-plugin-whitelist');
exec('cordova build');


