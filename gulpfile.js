var autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sequence = require('run-sequence'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    es = require('event-stream');

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];


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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./demo/css'));

    var normal = gulp.src('./src/scss/burger-icon.scss')
        .pipe(sass({
            outputStyle: 'nested'
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
            outputStyle: 'compact'
        }))
        .pipe(autoprefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/'));

    return es.concat(demo, normal, minified);
});

gulp.task('copy-normalize', function () {
    gulp.src('./bower_components/normalize-css/normalize.css')
        .pipe(gulp.dest('./demo/'));
});

gulp.task('copy-jQuery', function () {
    gulp.src('./bower_components/jquery/dist/jquery.slim.min.js')
        .pipe(gulp.dest('./demo/js'));
});

gulp.task('copyfiles', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./demo'));
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
