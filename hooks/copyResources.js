// This hook copies various resource files 
// into the appropriate platform specific location

require('shelljs/global');

module.exports = function() {
    let root = pwd();
    let dest = root+'/platforms/android/';

    if (test('-e', dest)) {
        rm('-Rf',root+'/platforms/android/res/drawable*');
        rm('-Rf',root+'/platforms/android/res/mipmap*');
        mv('-f', root+'/res/drawable*', root+'/platforms/android/res');
        mv('-f', root+'/res/mipmap*', root+'/platforms/android/res');
    }
}
