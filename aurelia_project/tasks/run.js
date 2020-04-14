import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback/lib';
import {CLIOptions} from 'aurelia-cli';
import project from '../aurelia.json';
import build from './build';
import watch from './watch';
import launch from '../../server/launch';
import * as childProcess from 'child_process';

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: CLIOptions.hasFlag('open'),
      port: project.platform.port,
      logLevel: 'silent',
      server: {
        baseDir: [project.platform.baseDir],
        middleware: [historyApiFallback(), function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
      }
    }, function (err, bs) {
      if (err) return done(err);
      let urls = bs.options.get('urls').toJS();
      log(`Application Available At: ${urls.local}`);
      log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
);

let elect = gulp.series(
    build,
    done => {
      childProcess
        .exec('npm start')
        .on("close", () => {
          // User closed the app. Kill the host process.
          process.exit();
        })
  
      done();
    }
);

function log(message) {
  console.log(message); //eslint-disable-line no-console
}

function reload() {
  log('Refreshing the browser');
  browserSync.reload();
}

if (CLIOptions.hasFlag('server')) {
  process.env['NODE_ENV'] = CLIOptions.getEnvironment();
  launch.startWebAPI();
}

let job;

if (CLIOptions.hasFlag('electron')) {
    job = elect
} else {
    job = serve
}

let run = gulp.series(
  job,
  done => { watch(reload); done(); }
);

export default run;
