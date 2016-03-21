'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jasmine = require('gulp-jasmine');

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

gulp.task('javascript', function () {
    return gulp.src([
      './src/vendor/js/*.js', 
      './src/mixins/config.js',
      ])
      .pipe(concat("all.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest('./build/js'))
});

gulp.task('sass', function () {
  gulp.src(['./src/vendor/scss/**/*.scss', './src/scss/**/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('jasmine', function() {
    return gulp.src('./spec/*.js')
        .pipe(jasmine())
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: './index.html',
    }));
});

gulp.task('default', ['sass', 'build', 'javascript']);

gulp.task('watch', ['sass', 'build', 'webserver'], function () {
  gulp.watch('./src/scss/**/*.scss' , ['sass']);
  gulp.watch('./src/jsx/**/*.jsx' , ['build']);
});