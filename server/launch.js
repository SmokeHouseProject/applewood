// start server and listen for changes
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

exports.startWebAPI = function startWebAPI() {

    gulp.task('webApi', function () {
        console.log('Starting Web API Server');
        // configure nodemon
        var stream = nodemon({
            // the script to run the app
            script: 'server/app.js',
            // this listens to changes in any of these files/routes and restarts the application
            watch: [
                "server/*.js",  
                "server/**/*"
                ],
            ext: 'js'
        });

        stream.on('restart', () => {
            console.log('Re-Starting Web API Server');
            gulp.src('app.js')
        })
            .on('crash', function () {
                console.error('Web API Server has crashed!');
                stream.emit('restart', 10); // restart the server in 10 seconds 
            });
    });

    gulp.start();
    
};



