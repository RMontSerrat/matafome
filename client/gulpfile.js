'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('build', function () {
    return browserify({entries: './src/handler/app.jsx', extensions: ['.jsx'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});

gulp.task('sass', function () {
  gulp.src(['./src/vendor/scss/**/*.scss', './src/scss/**/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

 
gulp.task('default', ['sass', 'build']);

gulp.task('watch', ['sass', 'build'], function () {
  gulp.watch('./src/scss/**/*.scss' , ['sass']);
  gulp.watch('./src/handler/**/*.jsx' , ['build']);
});