import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import babelify from 'babelify'
import rename from 'gulp-rename'

// Agregado presets y plugins en .babelrc
gulp.task('scripts', () => {
  return browserify('./src/scripts/main.js')
  .transform(babelify)
  .bundle()
  .on('error', (err) => {
    console.log(err)
    this.emit('end')
  })
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(rename('index.js'))
  .pipe(gulp.dest('./build/scripts'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./src/scripts'))
  .pipe(gulp.dest('./build/scripts'))
  .pipe(gulp.dest('./public/scripts'))
})
