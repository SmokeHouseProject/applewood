import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback/lib';
import project from '../aurelia.json';
import build from './build';
import {CLIOptions} from 'aurelia-cli';
import launch from '../../server/launch';
require('shelljs/global');

function log(message) {
  console.log(message); //eslint-disable-line no-console
}

function onChange(path) {
  log(`File Changed: ${path}`);
}

function reload(done) {
  browserSync.reload();
  force = false
  done();
}

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      logLevel: 'silent',
      server: {
        baseDir: ['.'],
        middleware: [historyApiFallback(), function(req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
      }
    }, function(err, bs) {
      let urls = bs.options.get('urls').toJS();
      log(`Application Available At: ${urls.local}`);
      log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
);

let refresh = gulp.series(
  build,
  reload
);

function forceBuild(done) {
  force = true;
  touch(project.cssProcessor.source);
  done();
}

let watch = function() {
  gulp.watch(project.transpiler.source, refresh).on('change', onChange);
  gulp.watch(project.markupProcessor.source, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.source, refresh).on('change', onChange);
  gulp.watch(project.watchFolders.less, forceBuild).on('change', onChange);
  gulp.watch(project.watchFolders.images, refresh).on('change', onChange);
  gulp.watch(project.watchFolders.root, refresh).on('change', onChange);
  gulp.watch(project.watchFolders.locales, refresh).on('change', onChange);
  gulp.watch(project.watchFolders.styles, refresh).on('change', onChange);
  gulp.watch(project.watchFolders.fonts, refresh).on('change', onChange);
};

if (CLIOptions.hasFlag('server')) {
  process.env['NODE_ENV'] = CLIOptions.getEnvironment();
  launch.startWebAPI();
}

let run;

if (CLIOptions.hasFlag('watch')) {
  run = gulp.series(
    serve,
    watch
  );
} else {
  run = serve;
}

export default run;

//flag used to force a rebuild
let force = false;
export {force};
