// Settings ====================================================

// paths
const srcPath = 'src/';
const stylesPath = srcPath + 'styles/';
const scriptsPath = srcPath + 'scripts/';
const distPath = 'dist/';


// Dependencies =================================================
const log = require('fancy-log');
const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const clean = require('gulp-clean');

const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const cssmin = require('gulp-cssmin');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');


// Tasks =======================================================

// delete dist files and folders
gulp.task('clean', function () {
    return gulp.src(distPath + '*', { read: false })
        .pipe(plumber())
        .pipe(clean());
});

// minify html
function html() {
    return gulp.src(srcPath + 'index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(distPath));
}
gulp.task('html:dev', html);
gulp.task('html:prd', html);

// compile and minify sass
function styles() {
    return gulp.src(stylesPath + 'main.scss')
        .pipe(plumber())

        .pipe(sourcemaps.init())

        .pipe(sassGlob())
        .pipe(sass({
            style: 'compressed'
        }).on('error', sass.logError))

        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))

        .pipe(sourcemaps.write())

        .pipe(gulp.dest(distPath));
}
gulp.task('styles:dev', styles);
gulp.task('styles:prd', styles);


// bundle and minify scripts
function scripts(cb) {

    glob(scriptsPath + '*.js', function (er, files) { // get files

        files.map((entry) => { // for each file in glob...

            const output = path.basename(entry); // get filename to serve as output (i.e., changes the output from 'src/scripts/file.js' to just 'file.js' 

            // bundle
            return browserify({
                entries: [entry] // entry
            })
                .transform(babelify, { presets: ['@babel/env'] }) // configured also in package.json
                .bundle()
                .pipe(plumber())
                .pipe(source(output)) // output
                .pipe(rename({ suffix: '.min' }))
                .pipe(buffer())

                // minify
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(uglify())
                .pipe(sourcemaps.write(''))

                .pipe(gulp.dest(distPath))
        })

    });

    cb(); // this makes the task return something and prevents the error "The following tasks did not complete: build, scripts; Did you forget to signal async completion?"

}
gulp.task('scripts:dev', scripts);
gulp.task('scripts:prd', scripts);


// Development (gulp watch) ======================================================
function watch() {
    gulp.watch(srcPath + 'index.html', gulp.series('html:dev'));
    gulp.watch(stylesPath + '**/*.scss', gulp.series('styles:dev'));
    gulp.watch(scriptsPath + '**/*.js', gulp.series('scripts:dev'));
}
gulp.task('watch', watch);


// Production (gulp build) ======================================================
gulp.task('build', gulp.series(
    'clean',
    'html:prd',
    'styles:prd',
    'scripts:prd'
));