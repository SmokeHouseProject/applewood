import gulp from 'gulp';
import {CLIOptions, build as buildCLI} from 'aurelia-cli';
import transpile from './transpile';
import processMarkup from './process-markup';
import processJson from './process-json';
import processCSS from './process-css';
import copyFiles from './copy-files';
import watch from './watch';
import project from '../aurelia.json';
import pushFiles from './push-files';
import pkg from '../../package.json';
import bump from 'gulp-bump';

let build = gulp.series(
  readProjectConfiguration,
  setAppVer,
  setConfigVer,
  gulp.parallel(
    transpile,
    processMarkup,
    processJson,
    processCSS,
    copyFiles
  ),
  writeBundles,
  pushFiles
);

let main;

if (CLIOptions.taskName() === 'build' && CLIOptions.hasFlag('watch')) {
  main = gulp.series(
    build,
    (done) => { watch(); done(); }
  );
} else {
  main = build;
}

function readProjectConfiguration() {
  return buildCLI.src(project);
}

function setConfigVer() {
    return gulp.src('./config.xml')
    .pipe(bump({version: pkg.version}))
    .pipe(gulp.dest('./'))
}

function setAppVer() {
    return gulp.src('./app/package.json')
    .pipe(bump({version: pkg.version}))
    .pipe(gulp.dest('./app/'))
}


function writeBundles() {
  return buildCLI.dest();
}

export { main as default };
