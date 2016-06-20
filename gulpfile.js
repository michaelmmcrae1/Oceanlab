// BUILT UP FROM: https://markgoodyear.com/2014/01/getting-started-with-gulp/

// npm install webpack-stream gulp-babel babel-preset-es2015 es6-promise gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev

// Install LiveReload Browser plugin
 
// DIRECTORY STRUCTURE:
// /.
// /src/html
// /src/scripts
// /src/
// /src/styles/main.scss
// /src/testing/*.json
// /dist/assets/css
// /dist/assets/js/main.js
// /dist/testing-data/*.json

require('es6-promise').polyfill();

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    server = require('gulp-connect'),
    browserify = require('gulp-browserify'),    
    babel = require('gulp-babel');
    nodemon = require('gulp-nodemon');

// Move source html
gulp.task('move-html', function() {
 return gulp.src('pages/*')
    .pipe(gulp.dest('dist'))
    .pipe(server.reload());
});

gulp.task('move', ['move-html']);

// JSHint, Concat, minify
gulp.task('scripts', function() {
  return gulp.src('static/js/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    //.pipe(concat('main.js'))
    //.pipe(babel({
    //  presets: ['es2015']
    //}))
    .pipe(browserify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    //.pipe(notify({ message: 'Scripts task complete' }))
});

// Compress images
gulp.task('images', function() {
  return gulp.src('static/files/*.jpg')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(server.reload());
});

// Clean up before deploy
gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

// Watching
gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['pages/**']).on('change', livereload.changed);
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch', 'clean', 'scripts', 'images', 'move'])
});

// Default, run by $gulp
gulp.task('default', ['clean', 'scripts', 'images', 'move', 'nodemon']);
