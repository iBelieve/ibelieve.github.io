const Metalsmith  = require('metalsmith')
const collections = require('metalsmith-collections')
const layouts     = require('metalsmith-layouts')
const markdown    = require('metalsmith-markdown')
const permalinks  = require('metalsmith-permalinks')
const beautify    = require('metalsmith-beautify')
const watch       = require('metalsmith-watch')
const serve       = require('metalsmith-serve')
const env         = require('metalsmith-env')
const path        = require('./metalsmith-path')
const nunjucks    = require('nunjucks')

const args = require('yargs').argv

nunjucks.configure('.', {
  watch: args.watch,
  noCache : true
})


const metalsmith = Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    siteurl: 'http://example.com/',
    description: 'It\'s about saying »Hello« to the world.',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/'
  })
  .source('./content')
  .destination('./dist')
  .clean(false)
  .use(env())
  .use(markdown())
  .use(permalinks({ relative: false }))
  .use(path({
    baseDirectory : "/",
    directoryIndex : "index.html"
  }))
  .use(layouts({
    engine: 'nunjucks',
    requires: { nunjucks },
    partials: 'partials',
    default: 'default.njk',
    cache: false
  }))
  .use(beautify({
    'wrap_line_length': 120,
    'indent_size': 2,
    'indent_char': ' ',
    'preserve_newlines': false
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
