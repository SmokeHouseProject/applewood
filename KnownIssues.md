>Building electron apps may fail on Mac with a `resource busy` error message. It appears the DMG mount remembers that is has mounted the DMG file and then reports as being busy. The only work around that I have found to-date is to reboot the MAC.
Please see [README](dist/README.md) 

>The 'blueimp-md5' node package is missing a trailing semicolon in the source code. This causes a runtine error in the vendor-bundle. This has been reported to Aurelia and a fix has been made in the bundler code. Please ensure you are using "aurelia-cli": "^1.0.0-beta.11" or newer.

>Adding the cordova.js shim to the root causes the cordova command line to fail when executed from the root. A workaround is to change directory to root/www and execute cordova commands.


