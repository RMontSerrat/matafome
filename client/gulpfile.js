'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: './src/jsx/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function () {
  gulp.src(['./src/vendor/scss/**/*.scss', './src/scss/**/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: './index.html',
    }));
});

gulp.task('default', ['sass', 'build']);

gulp.task('watch', ['sass', 'build', 'webserver'], function () {
  gulp.watch('./src/scss/**/*.scss' , ['sass']);
  gulp.watch('./src/jsx/**/*.jsx' , ['build']);
});