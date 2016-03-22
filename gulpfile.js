var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] });
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    swig = require('gulp-swig'),
    insert = require('gulp-insert');

	
/*******************************************************************************
	SOURCES AND RESULT PATHS
*******************************************************************************/
var paths = {
    result: {
        css: 'result/css',
        images: 'result/images',
        root: 'result',
        jsApp: 'result/js',
        jsClasses: 'result/js',
        dataJSON: 'src/data'
        },
    src: {
        htmlIndex: 'src/index.html',
        html: 'src/swig/**/*',
        css: 'src/styles/**/*.less',
        images: 'src/images/**/*',
        jsApp: 'src/scripts/app/**/*.js',
        jsClasses: 'src/scripts/mvc/**/*.js',
        dataJSON: 'src/data/**/*.json'
        },
}


/*******************************************************************************
	DEFAULT TASKS
*******************************************************************************/

gulp.task('clean', function(cb) {
    del([paths.result.root
        ], cb);
});

gulp.task('default', ['clean','connect'], function(){
    gulp.start('html');
    gulp.start('styles');
	gulp.start('images');
	gulp.start('jsClasses');
	gulp.start('jsApp');
	gulp.start('dataJSON');
    gulp.watch(paths.src.htmlIndex, ['html']);
    gulp.watch(paths.src.html, ['html']);
    gulp.watch(paths.src.css, ['styles']);
    gulp.watch(paths.src.images, ['images']);
    gulp.watch(paths.src.jsApp, ['jsApp']);
    gulp.watch(paths.src.jsClasses, ['jsClasses']);
    gulp.watch(paths.src.jsClasses, ['dataJSON']);
});


/*******************************************************************************
	Data JSON
*******************************************************************************/
gulp.task('dataJSON', function() {
    return gulp.src(paths.src.dataJSON)
        .pipe(gulp.dest(paths.result.dataJSON));
});


/*******************************************************************************
	Scripts
*******************************************************************************/
gulp.task('jsApp', function() {
    return gulp.src(paths.src.jsApp)
        .pipe(concat('app.js'))
        .pipe(insert.prepend('"use strict";\n'))
        .pipe(gulp.dest(paths.result.jsApp));
});
gulp.task('jsClasses', function() {
    return gulp.src(paths.src.jsClasses)
        .pipe(concat('mvc.js'))
        .pipe(insert.prepend('"use strict";\n'))
        .pipe(gulp.dest(paths.result.jsClasses));
});


/*******************************************************************************
	STYLES
*******************************************************************************/
gulp.task('styles', function() {
   return gulp.src(paths.src.css)
	  .pipe(concat('style.min.css'))
      .pipe(less({
        plugins: [autoprefix]
      }))
	  .pipe(minifycss())
	  .pipe(gulp.dest(paths.result.css));
});

/*******************************************************************************
	HTML
*******************************************************************************/

gulp.task('html', function() {
  return gulp.src(paths.src.htmlIndex)
    .pipe(gulp.dest(paths.result.root));
});


/*******************************************************************************
	IMAGES
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.result.images));
});

/*******************************************************************************
	WEB SERVER
*******************************************************************************/
gulp.task('connect', function() {
    connect.server({
        root: 'result',
        livereload: false,
        port: 1209
    });
});
gulp.task('dataJSON', function() {
  return gulp.src('src/data/**')
    .pipe(gulp.dest('result/data'));
});


