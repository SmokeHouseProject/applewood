require('shelljs/global');

//setup the web api
cd('server');
exec('npm install');
exec('node seed');
cd('..');

//build project
exec('au build');

//set up cordova
cd('www');
exec('cordova prepare');
exec('cordova build');
cd('..');

