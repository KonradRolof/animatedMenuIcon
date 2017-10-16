/**
 * load plugins
 */
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync").create();
var sourcemaps = require('gulp-sourcemaps');
var sequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var gulp = require('gulp');
var sass = require('gulp-sass');
var es = require('event-stream');

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

/**
 * define tasks
 */
// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function (done) {
    rimraf('./dist', done);
});


// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function () {
    var demo = gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./demo/css'));

    var normal = gulp.src('./src/scss/burger-icon.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(gulp.dest('./dist/'));

    var minified = gulp.src('./src/scss/burger-icon.scss')
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/'));

    return es.concat(demo, normal, minified);
});

gulp.task('copy-normalize', function () {
    gulp.src('./node_modules/normalize-css/normalize.css')
        .pipe(gulp.dest('./demo/css'));
});

gulp.task('copy-jQuery', function () {
    gulp.src('./node_modules/jquery/dist/jquery.slim.min.js')
        .pipe(gulp.dest('./demo/js'));
});

gulp.task('copyfiles', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./demo'));
});

gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: './demo'
    });

    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/index.html', ['copyfiles']).on('change', browserSync.reload);
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function (done) {
    sequence('clean', ['copyfiles', 'copy-normalize', 'copy-jQuery', 'sass'], done);
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build'], function () {
    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch(['./src/*.html'], ['copyfiles']);
});
