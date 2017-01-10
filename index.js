const Metalsmith   = require('metalsmith')
const collections  = require('metalsmith-collections')
const layouts      = require('metalsmith-layouts')
const markdown     = require('metalsmith-markdown')
const permalinks   = require('metalsmith-permalinks')
const watch        = require('metalsmith-watch')
const serve        = require('metalsmith-serve')
const env          = require('metalsmith-env')
const prism        = require('metalsmith-prism')
const path         = require('./lib/metalsmith-path')
const readTime     = require('./lib/metalsmith-read-time')

const nunjucks     = require('nunjucks')
const moment       = require('moment')
const friendlyDate = require('./lib/format-date')

require('prismjs/components/prism-clike')
require('prismjs/components/prism-c')

const args = require('yargs').argv

const njk = nunjucks.configure('.', {
  watch: args.watch,
  noCache : true
})

njk.addFilter('date', function (value, format) {
  const date = moment(value)

  if (format) {
    return date.format(format)
  } else {
    return friendlyDate(date)
  }
});


const metalsmith = Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    siteurl: 'http://example.com/',
    description: 'It\'s about saying »Hello« to the world.',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/',
    links: {
      github: 'iBelieve',
      email: 'contact@mspencer.io'
    }
  })
  .source('./content')
  .destination('./dist')
  .clean(false)
  .use(env())
  .use(collections({
    posts: 'posts/*.md'
  }))
  .use(markdown({
    langPrefix: 'language-',
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(readTime())
  .use(prism())
  .use(permalinks({
    relative: false,
    date: 'YYYY/MM',
    linksets: [{
      match: { collection: 'posts' },
      pattern: 'blog/:date/:title'
    }]
  }))
  .use(path({
    baseDirectory : "/",
    directoryIndex : "index.html"
  }))
  .use(layouts({
    engine: 'nunjucks',
    requires: { njk },
    partials: 'partials',
    default: 'default.njk',
    cache: false
  }))

if (args.watch) {
  metalsmith
    .use(serve({
      port: 8080,
      verbose: true,
      http_error_files: {
        404: '/404.html'
      }
    }))
    .use(watch({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': '**/*',
        'partials/**/*': '**/*'
      },
      livereload: true
    }))
}

metalsmith
  .build(function(err) {
    if (err) throw err
  })
