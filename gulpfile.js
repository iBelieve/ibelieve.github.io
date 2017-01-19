const gulp     = require('gulp')
const gutil    = require('gulp-util')
const es       = require('event-stream')
const plugins  = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})
const nunjucks = require('nunjucks')
const moment   = require('moment')

require('prismjs')
require('prismjs/components/prism-clike')
require('prismjs/components/prism-c')

/***** METALSMITH SETUP *****/

const metalsmith = {
  collections: require('metalsmith-collections'),
  layouts:     require('metalsmith-layouts'),
  markdown:    require('metalsmith-markdown'),
  permalinks:  require('metalsmith-permalinks'),
  env:         require('metalsmith-env'),
  excerpts:    require('metalsmith-better-excerpts'),
  prism:       require('metalsmith-prism'),
  feed:        require('metalsmith-feed'),
  tags:        require('metalsmith-tags'),
  publish:      require('metalsmith-publish'),
  path:        require('./lib/metalsmith-path'),
  readTime:    require('./lib/metalsmith-read-time')
}

const njk = nunjucks.configure('.', {
  watch: false,
  noCache : true
})

njk.addFilter('date', function(value, format = 'MMM Do, YYYY') {
  return moment(value).format(format)
})
njk.addFilter('iso_date', function(value) {
  return moment(value).toISOString()
})
njk.addFilter('split', function(value) {
  return value.split(/,\s*/g)
})

/***** GLOBAL CONSTANTS *****/

const IS_DEV = process.env.NODE_ENV !== 'production'
const SASS_STYLE = IS_DEV ? 'expanded' : 'compressed'
const SOURCE_MAPS = !IS_DEV

const METADATA = {
  site: {
    title: 'Michael Spencer - Software Developer',
    url: 'http://mspencer.io',
    author: 'Michael Spencer'
  },
  // description: 'It\'s about saying »Hello« to the world.',
  generatorname: 'Metalsmith',
  generatorurl: 'http://metalsmith.io',
  links: {
    github: 'iBelieve',
    email: 'contact@mspencer.io',
    googlePlus: 'MichaelSpencer',
    twitter: 'iBeliever316',
    repository: 'iBelieve/ibelieve.github.io'
  }
}

const PATHS = {
  content: {
    files: 'content/**',
    dest: './dist'
  },
  layouts: {
    files: 'layouts/**'
  },
  partials: {
    files: 'partials/**'
  },
  styles: {
    sass: {
      src: 'assets/sass',
      files: 'assets/sass/**/*.scss',
    },
    css: {
      src: 'assets/css',
      files: 'assets/css/**/*.css'
    },
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

/***** TASKS *****/

gulp.task('content', function() {
  return gulp.src(PATHS.content.files)
    .pipe(plugins.metalsmith({
      root: __dirname,
      use: [
        metalsmith.publish({
          draft: IS_DEV
        }),
        metalsmith.env(),
        metalsmith.tags({
          path:'blog/topics/:tag.html',
          layout:'topic.njk',
          sortBy: 'date',
          reverse: true,
          slug: { mode: 'rfc3986' }
        }),
        metalsmith.collections({
          posts: 'posts/*.md',
          latestPosts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            reverse: true,
            limit: 5
          }
        }),
        metalsmith.markdown({
          langPrefix: 'language-',
          smartypants: true,
          gfm: true,
          tables: true
        }),
        metalsmith.excerpts({ pruneLength: 300 }),
        metalsmith.readTime(),
        metalsmith.prism(),
        metalsmith.permalinks({
          relative: false,
          date: 'YYYY/MM',
          linksets: [{
            match: { collection: 'posts' },
            pattern: 'blog/:date/:title'
          }]
        }),
        metalsmith.path({
          baseDirectory : "/",
          directoryIndex : "index.html"
        }),
        metalsmith.layouts({
          engine: 'nunjucks',
          requires: { njk },
          partials: 'partials',
          default: 'default.njk',
          cache: false
        }),
        metalsmith.feed({ collection: 'posts', destination: 'feed.xml' })
      ],
      metadata: METADATA
    }))
    .pipe(plugins.size())
    .pipe(gulp.dest(PATHS.content.dest))
})


gulp.task('styles', function() {
  const sass = gulp.src(PATHS.styles.sass.files)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: SASS_STYLE,
      includePaths: [PATHS.styles.sass.src]
    }))
    .on('error', function(err) {
      throw new gutil.PluginError('CSS', err, { showStack: true })
    })

  es.concat(gulp.src(PATHS.styles.css.files), sass)
    .pipe(plugins.concat('styles.css'))
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(IS_DEV ? gutil.noop() : plugins.cssmin())
    .pipe(IS_DEV ? plugins.sourcemaps.write() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(PATHS.styles.dest))
})

gulp.task('scripts', function() {
  gulp.src(PATHS.scripts.src)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.js'))
    .pipe(IS_DEV ? gutil.noop() : plugins.uglify())
    .pipe(IS_DEV ? plugins.sourcemaps.write() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(PATHS.scripts.dest))
})

gulp.task('images', function() {
  gulp.src(PATHS.images.src)
    .pipe(plugins.size())
    .pipe(gulp.dest(PATHS.images.dest))
})

gulp.task('serve', ['content', 'styles', 'scripts', 'images'], function(){
  var server = plugins.liveServer.static('dist');
  server.start();

  gulp.watch(['dist/**'], function (file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch([PATHS.content.files, PATHS.layouts.files, PATHS.partials.files],
             ['content']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(PATHS.styles.sass.files, ['styles']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(PATHS.styles.css.files, ['styles']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(PATHS.scripts.src, ['scripts']).on('change', function(evt) {
    changeEvent(evt)
  })
  gulp.watch(PATHS.images.src, ['images']).on('change', function(evt) {
    changeEvent(evt)
  })
})

gulp.task('default', ['content', 'styles', 'scripts', 'images'])
