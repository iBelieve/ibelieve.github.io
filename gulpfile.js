const gulp    = require('gulp')
const gutil   = require('gulp-util')
const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})

const IS_DEV = process.env.NODE_ENV !== 'production'
const SASS_STYLE = IS_DEV ? 'expanded' : 'compressed'
const SOURCE_MAPS = !IS_DEV

const paths = {
  styles: {
    src: 'assets/sass',
    files: 'assets/sass/**/*.scss',
    dest: './dist/css/'
  },
  scripts: {
    src: 'assets/js/**/*.js',
    dest: './dist/js/'
  },
  images: {
    src: 'assets/images/**/*',
    dest: './dist/images/'
  }
}

function changeEvent(evt) {
  gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + __dirname + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
}

gulp.task('sass', function() {
  gulp.src(paths.styles.files)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: SASS_STYLE,
      includePaths: [paths.styles.src]
    }))
    .on('error', function(err) {
      new gutil.PluginError('CSS', err, { showStack: true })
    })
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(IS_DEV ? gutil.noop() : plugins.cssmin())
    .pipe(IS_DEV ? plugins.sourcemaps.write() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.styles.dest))
})

gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.js'))
    .pipe(IS_DEV ? gutil.noop() : plugins.uglify())
    .pipe(IS_DEV ? plugins.sourcemaps.write() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('images', function() {
  gulp.src(paths.images.src)
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.images.dest))
})

gulp.task('watch', ['sass', 'scripts', 'images'], function(){
  gulp.watch(paths.styles.files, ['sass']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(paths.scripts.src, ['scripts']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(paths.images.src, ['images']).on('change', function(evt) {
    changeEvent(evt)
  })
})

gulp.task('default', ['sass', 'scripts', 'images'])
