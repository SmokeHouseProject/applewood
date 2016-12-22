import gulp from 'gulp';
import del from 'del';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import {CLIOptions, build} from 'aurelia-cli';
import project from '../aurelia.json';


export default gulp.series(
    readProjectConfiguration,
    gulp.parallel(
        transpile,
        processMarkup,
        processCSS
    ),
    writeBundles,
    gulp.parallel(
        cleanLocalesDest,
        cleanScriptDest,
        cleanImageDest,
        cleanFontDest
    ),
    gulp.parallel(
        copyBundles,
        copyLocales,
        copyImages,
        copyFonts,
        copyStyles,
        copyRoot
    )
);

function readProjectConfiguration() {
    return build.src(project);
}

function writeBundles() {
    return build.dest();
}

//custom methods to update cordova directories
//

function cleanLocalesDest() {
    return del([
        './www/locales/**/*',
        './app/locales/**/*',
        './platforms/ios/www/locales/**/*',
        './platforms/android/assets/www/locales/**/*'
    ]);
}

function cleanFontDest() {
    return del([
        './www/fonts/**/*',
        './app/fonts/**/*',
        './platforms/ios/www/fonts/**/*',
        './platforms/android/assets/www/fonts/**/*'
    ]);
}

function cleanImageDest() {
    return del([
        './www/images/**/*',
        './app/images/**/*',
        './platforms/ios/www/images/**/*',
        './platforms/android/assets/www/images/**/*'
    ]);
}

function cleanScriptDest() {
    return del([
        './www/scripts/**/*',
        './app/scripts/**/*',
        './platforms/ios/www/scripts/**/*',
        './platforms/android/assets/www/scripts/**/*'
    ]);
}

function copyBundles() {
    let source = ['./scripts/app-bundle.js','./scripts/vendor-bundle.js'];
    if (CLIOptions.getEnvironment() === 'dev') {
        source.push('./scripts/app-bundle.js.map');
    }
    return gulp.src(source)
        .pipe(gulp.dest('./www/scripts'))
        .pipe(gulp.dest('./app/scripts'))
        .pipe(gulp.dest('./platforms/ios/www/scripts'))
        .pipe(gulp.dest('./platforms/android/assets/www/scripts'));
}

function copyLocales() {
    return gulp.src('./locales/**/*.json')
        .pipe(gulp.dest('./www/locales'))
        .pipe(gulp.dest('./app/locales'))
        .pipe(gulp.dest('./platforms/ios/www/locales'))
        .pipe(gulp.dest('./platforms/android/assets/www/locales'));
}

function copyImages() {
    return gulp.src('./images/*.*')
        .pipe(gulp.dest('./www/images'))
        .pipe(gulp.dest('./app/images'))
        .pipe(gulp.dest('./platforms/ios/www/images'))
        .pipe(gulp.dest('./platforms/android/assets/www/images'));
}

function copyFonts() {
    return gulp.src('./fonts/*.*')
        .pipe(gulp.dest('./www/fonts'))
        .pipe(gulp.dest('./app/fonts'))
        .pipe(gulp.dest('./platforms/ios/www/fonts'))
        .pipe(gulp.dest('./platforms/android/assets/www/fonts'));
}

function copyStyles() {
    return gulp.src('./styles/*.css')
        .pipe(gulp.dest('./www/styles'))
        .pipe(gulp.dest('./app/styles'))
        .pipe(gulp.dest('./platforms/ios/www/styles'))
        .pipe(gulp.dest('./platforms/android/assets/www/styles'));
}

function copyRoot() {
    return gulp.src(['./index.html', './favicon.ico'])
        .pipe(gulp.dest('./www'))
        .pipe(gulp.dest('./app'))
        .pipe(gulp.dest('./platforms/ios/www'))
        .pipe(gulp.dest('./platforms/android/assets/www'));
}
