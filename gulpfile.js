const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      htmlInjector = require('bs-html-injector'),
      browserSync  = require('browser-sync').create()
      rollup       = require('rollup');

src = {
  html: 'src/*.html',
  scss: 'src/scss/*.scss',
  js: 'src/js/*.js'
}

dist = {
  html: 'dist/',
  css:  'dist/css/',
  js:   'dist/js/index.js'
}

// Static Server + watching scss/html files
gulp.task('serve', ['distHTML', 'rollup', 'sass'], function() {
  browserSync.use(htmlInjector, {
        files: "dist/*.html"
  });

  browserSync.init({
    server: "./dist"
  });

  gulp.watch(src.html, ['distHTML']);
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js,   ['rollup']).on('change', browserSync.reload);
});

// Moves html files from src to dist folder
gulp.task('distHTML', function() {
  return gulp.src(src.html)
              .pipe(gulp.dest(dist.html))
});

// Compile sass into CSS
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(sass())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({ stream: true }));
});

// Convert ES6 Modules using rollup
gulp.task('rollup', function() {
  var entry   = 'src/js/index.js';
  var dest    = dist.js;
  // var plugins = [
  //   buble(),
  // ];
  // rollup.rollup({ entry, plugins }).then(bundle => {
  rollup.rollup({ entry }).then(bundle => {
    bundle.write({
       format: 'es',
       dest: dest,
       sourceMap: true,
       sourceMapFile: dest
     });
  }).catch(err => {
    console.log(err);
  });
});

gulp.task('default', ['serve']);
