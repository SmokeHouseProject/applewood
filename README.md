# Applewood 

Applewood is a tasty flavor of The Smoke House Project <https://github.com/smokehouseproject>

Applewood is a skeleton framework for desktop/web/mobile deployment using Aurelia, a node Web API and a MongoDB.
Each Smoke House Project is a good starting point for any project that can be run in a browser, compiled to a mobile app or built with electron into a desktop app.

>Latest ver 0.2.0 has been updated to use node 10.x.x and uses latest release of Aurelia CLI

Is a collection of the following libraries:  
-  Electron  <http://electron.atom.io/> builder for desktop apps
-  Cordova  <https://cordova.apache.org/> builder for mobile apps
-  Aurelia  <http://aurelia.io/> modern javascript framework
-  Mongoose  <http://mongoosejs.com/> data base connector

Contains the following features:
-  User Authentication
-  User roles and permissions
-  Web API Authentication
-  Touch handling for mobile
-  Scroll handling for mobile
-  Localization
-  Collection of Less mixins
-  Data models that can auto persist state on mobile pause and resume

## Prerequisites
___

The following items must be installed on your dev machine with the exception of the MongoDB server. You just need a sever to be available for development.

-  MongoDB database server <https://www.mongodb.com/download-center#community>
-  Node.js version 4.x or above <https://nodejs.org/en/> (Mac users see note below before installing node)
-  Git Client <https://desktop.github.com/> or <https://git-scm.com/>
-  Android Studio <https://developer.android.com/studio/index.html> and JDK 1.8 <http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html> on Macs and Windows machines
-  Xcode (on Macs only) 

>For all users you may want to use Node Version manager (recommended)
- <https://github.com/coreybutler/nvm-windows> Windows machines
- <https://github.com/creationix/nvm> Macs 

>You will need a good code editor. I recommend Visual Studio Code <https://code.visualstudio.com/download> but you may use any code editor you feel comfortable with. The Aurelia project in this framework has been optimized for Visual Studio Code. You may have to do some re-work for other editors.

## Getting Started
___

1.  Make sure you have all the prerequisites installed and working.
2.  Clone or download this repository to your development machine.
3.  Open a terminal (mac users) or command prompt (windows users) in the root of your cloned project. Enter the following commands:
4.  `npm install electron -g`
5.  `npm install cordova -g`
6.  `npm install aurelia-cli -g`
7.  `npm install karma-cli -g`
8.  `npm install ios-deploy -g` (Only on Macs)
9.  `npm install` (Be patient - it may take awhile!)

Next set configurations before running the prep command

1. Determine the IP address of your machine (Don't use localhost)
2.  Determine the IP address of your MongoDB server
3. Edit `client/config/config.js` and set the following:
    - `authApi => baseUrl: 'http://yourIP:8050'`
    - `webApi => baseUrl: 'http://yourIP:8050/api/'`
4. Edit `server/config/config.dev.js` and set the following:
    - `config.host = 'yourIP`
    - `config.mongo.connectionstring = 'mongodb://yourMongoServerIP/Applewood'`

Enter `npm run prep` in the terminal open at the root of the project.

>It is important to run the prep command. This installs the cordova platforms and plugins as well as performing a build and initializing the server web api. This only needs to done once.

>The prep commands also seeds the data base with an administrator user with `username: sam` and `password: crow` so that you can log in.

## Cordova
___

The cordova platform is pre configured as follows:  
  - Platforms
      - Browser
      - IOS
      - Android
  -  Plugins   
      - Device
      - Splachscreen
      - Whitelist

The Cordova wrapper consumes the following directories and files:
  <pre><code>
    |-- /hooks              Cordova build hooks
    |-- /platforms          Platform files
    |-- /plugins            Plugin files
    |-- /res                Resource files
    |-- /www                Core project source (don't edit this)
    |-- config.xml          Cordova config file
    |-- cordova.js          Polyfill to stub cordova in a browser
    |-- cordova_plugins.js  Polyfill to stub cordova in a browser
  </code></pre>

>The www folder gets updated by a custom aurelai build script. Do not edit this folder.

>Mobile resource images are in the res folder. Please see [README](res/README.md) for detailed instructions.

>Run `cordova build` if you change anything in any of the above files. It is not necessary to run a cordova build when editing the aurelia project because the custom build scripts push the www folder to the platforms.

## Aurelia
___

This project uses a pre-configured aurelia project using the aurelia cli <https://aurelia.io/docs/cli> with the following options selected:

1.  Built-in bundler with RequireJS
2.  ESNext
3.  Babel
4.  Less CSS pre-processor
5.  Unit Testing using Karma and Jasmine
6.  Visual Studio Code as the editior  

Aurelia (the core project) consumes the following directories and files:
  <pre><code>
    |-- /.vscode            Visual Studio Code settings
    |-- /aurelia_project    Aurelia project files
    |-- /automation         Scripts to prep the project    
    |-- /client             Aurelia source files 
    |-- /images             Image files
    |-- /fonts              Font files
    |-- /images             Image files
    |-- /less               Less files
    |-- /locales            Language files
    |-- /scripts            Aurelia generated bundles
    |-- /styles             CSS files
    |-- /test               Test Scripts 
    |-- .babelrc            Bable config
    |-- .editorconfig       Visual Studio editor config
    |-- .eslintrc.json      Linter config
    |-- .gitignore          Git config
    |-- cordova.js          Polyfill to stub cordova in a browser
    |-- favicon.ico         Browser icon
    |-- index.html          Main file for Aurelia
    |-- jsconfig.json       Visual Studio config
    |-- karma.cong.js       Karma config
    |-- main.js             Launcher used by Electron
  </code></pre>

To run the app in dev mode open a new terminal and enter

1.  `au run --watch` &nbsp;&nbsp;&nbsp;&nbsp;runs the aurelai app in watch mode
2.  `au run --watch --server` &nbsp;&nbsp;&nbsp;&nbsp;runs the aurelai app and web api server in watch mode

The build can be changed for different environments by adding a command line switch

1.  `au run --watch --server --env dev` &nbsp;&nbsp;&nbsp;&nbsp;builds the aurelia app and web api server for development
2.  `au run --watch --server --env stage` &nbsp;&nbsp;&nbsp;&nbsp;builds the aurelia app and web api server for stage
3.  `au run --watch --server --env prod` &nbsp;&nbsp;&nbsp;&nbsp;builds the aurelia app and web api server for production

To run the test suite open a new terminal window and enter

1.  `au test --watch` &nbsp;&nbsp;&nbsp;&nbsp;runs the aurelia app tests in watch mode
2.  `karma start` &nbsp;&nbsp;&nbsp;&nbsp;runs the web api server tests in watch mode

## Electron
___

Electron uses the electron-builder <https://github.com/electron-userland/electron-builder> to build Windows, Unix and Mac installable packages.
Configurations settings are located in [package.json](package.json).

Electron consumes the following directories and files:
  <pre><code>
    |-- /app                Core project source (don't edit this)
    |-- /build              Build resource files
    |-- /dist               Distribution files from build
    |-- main.js             Loader file for Electron
  </code></pre>

>The app folder gets updated by a custom aurelai build script. Do not edit this folder.

>The build folder contains image resources required by electron. Please see [README](build/README.md) for detailed instructions.

1.  To run the app in electron open new terminal in root and enter `electron app`
2.  To build the app open new terminal in root and enter `npm run dist`

## Web API
___

The web API is located in the server directory.
It is a stand alone project and is launched by a customized aurelia run script.

Please see [README](server/README.md) for more information.

## Configuring the Client
___

All configurations are located in the client/config directory

>The baseUrl settings should match the server host settings.
>Please note the `/api/` addition to the url for the webApi setting

Please see [README](server/README.md) for configuring the server


