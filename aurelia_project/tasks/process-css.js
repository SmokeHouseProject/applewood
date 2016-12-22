import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import less from 'gulp-less';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';
import {force} from './run';

export default function processCSS() {
    return gulp.src(project.cssProcessor.source)
      .pipe(gulpif(force, gutil.noop() ,changedInPlace({firstPass: true})))
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(build.bundle());
}

