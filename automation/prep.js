require('shelljs/global');

//setup the web api
cd('server');
exec('npm install');
exec('node seed');
cd('..');

//set up cordova
//initializes the platforms directories and adds plugins
cd('www');
exec('cordova prepare');
cd('..');

//build project
//copies the cordova scripts from platforms => aurelia
//copies aurelia => www (cordova)
//copies aurelia => app (electron)
exec('au build');

//All project files are synced and ready for running / building
