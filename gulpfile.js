'use strict';
/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp'),
    gulploadPlugins = require('gulp-load-plugins'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    requireDir = require('require-dir');

var config = {
   sassPath: './scss/sass',
   bowerDir: './bower_components'
}

var tasks = requireDir('./tasks');

var plugins = gulploadPlugins();

/*==========================================================
 GULP: ENVIRONMENT :: Gulp Default Tasks -- build
===========================================================*/
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});


gulp.task('icons', function() {
    return gulp.src('bower_components/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./app/fonts'));
});


gulp.task('css', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
            style: 'compressed',
           loadPath: [
                './scss/sass',
                config.bowerDir + 'bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss/font-awesome.scss', 
                config.bowerDir + '/FlexSlider-Scss/flexslider.scss',
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./app/css'));
});

// gulp.task('watch', function() {
//     gulp.watch(config.sassPath + '/**/*.scss', ['css']);
// });

gulp.task('default', ['bower', 'icons', 'css']);
gulp.task('default', ['build']);



/*-----------------------------------------------------------
 GULP : HELPERS
 Quick tasks to make your life easier!
-----------------------------------------------------------*/

// GULP: HELPERS :: List all gulp plugin tasks
gulp.task('help', plugins.taskListing);





// gulp.task('icons', function() {
//     return gulp.src('bower_components/font-awesome/fonts/**.*')
//         .pipe(gulp.dest('./app/fonts'));
// });

// var bsConfig = require("gulp-bootstrap-configurator");


// gulp.task('make-bootstrap-js', function(){
//  return gulp.src('/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js')
 		
   

//    .pipe(gulp.dest("./app/js"));
//     // It will create `bootstrap.js` in directory `assets`. 
// });

