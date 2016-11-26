const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      htmlInjector = require('bs-html-injector'),
      browserSync  = require('browser-sync').create();

src = {
  scss: 'app/scss/*.scss',
  css:  'app/css',
  html: 'app/*.html'
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.use(htmlInjector, {
        files: "app/*.html"
  });

  browserSync.init({
    server: "./app"
  });

  gulp.watch(src.scss, ['sass']);
});

// Compile sass into CSS
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(sass())
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve']);
