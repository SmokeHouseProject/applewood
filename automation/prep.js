require('shelljs/global');

//setup the web api
cd('server');
exec('npm install');
exec('node seed');
cd('..');

//set up cordova
cd('www');
exec('cordova prepare');
cd('..');

//build project
exec('au build');

//build cordova
cd('www');
exec('cordova build');
cd('..');

