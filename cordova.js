//cordova bootstrapper
function injectCordova() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'scripts/cordova.js';
    document.body.appendChild(script);
} 

injectCordova();
