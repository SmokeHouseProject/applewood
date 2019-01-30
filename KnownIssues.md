>Building electron apps may fail on Mac with a `resource busy` error message. It appears the DMG mount remembers that is has mounted the DMG file and then reports as being busy. The only work around that I have found to-date is to reboot the MAC.
Please see [README](dist/README.md) 

>The 'blueimp-md5' node package is missing a trailing semicolon in the source code. This causes a runtine error in the vendor-bundle. This has been reported to Aurelia and a fix has been made in the bundler code. Please ensure you are using "aurelia-cli": "^1.0.0-beta.11" or newer.

>Adding the cordova.js shim to the root causes the cordova command line to fail when executed from the root. A workaround is to change directory to root/www and execute cordova commands.

>There is a bug in Cordova Browser code causing the config.xml load to fail when running inside Electron. See https://github.com/apache/cordova-browser/pull/50. This bug has been fixed but has not yet been released. We are currently using release 5.0.4 This fix should be in the next release. Temporary fix => Open /platforms/browser/www/cordova.js in editor. Goto line 890. Remove leading "/" from code segment <pre><code> xhr.open("get", "/config.xml", true); </code></pre> so that it reads <pre><code> xhr.open("get", "config.xml", true); </code></pre>The leading "/" causes the xhr loader to use an absolute path from the root of your drive instead of the relative path for the project. Removing the leading "/" fixes this behaviour.
