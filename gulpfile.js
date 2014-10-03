var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var react = require('gulp-react');
var notify = require('gulp-notify');
var clean = require('gulp-clean');
var sass = require('gulp-sass');

var paths = {
		  css: ['static/styles/**'],
		  scripts: [
		    'static/js/**/*.js',
		    '!static/js/**/*.react.js'
		  ],
		  bowerComponents: 'static/bower_components/**',
		  images: ['static/images/**'],
		  rootSassFileForApp: 'static/styles/main.scss',
		  jsxTemplates: 'static/js/**/*.react.js'
		};


gulp.task('react', function (done) {
    var dest = 'assets/js';

    return gulp.src('static/js/**/*.react.js') // any subfolder with the react exetension
      .pipe(react())
      .pipe(gulp.dest(dest))
      .pipe(notify({ message: 'Transformed React JSX templates and copied to: ' + dest, onLast: true }));
  });


gulp.task('scripts', function (done) {
    var dest = 'assets/js';

    return gulp.src(paths.scripts) // any subfolder with the react exetension
        .pipe(gulp.dest(dest))
        .pipe(notify({ message: 'Copied js files to: ' + dest, onLast: true }));
});

gulp.task('clean', function (done) {

    return gulp.src(['assets'], {read: false})
      .pipe(clean({force: true}))
      .pipe(notify({ message: 'Cleaned out the assets directory', onLast: true }));
  });

//add SASS task


gulp.task('sass', function (done) {
    var dest = "assets/styles";

    return gulp.src(paths.rootSassFileForApp)
      .pipe(sass({
        sourceMap: 'sass',
        sourceComments: 'map'
      }))
      .pipe(gulp.dest(dest))
      .pipe(notify({ message: 'Transformed SCSS to CSS and copied files to: ' + dest, onLast: true }));
  });

//
// Gulp Configurations
//

gulp.task('default', function () {

  runSequence(
    'clean',
    ['sass','scripts','react']
  );


});

