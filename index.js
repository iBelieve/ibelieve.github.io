const Metalsmith  = require('metalsmith')
const collections = require('metalsmith-collections')
const layouts     = require('metalsmith-layouts')
const markdown    = require('metalsmith-markdown')
const permalinks  = require('metalsmith-permalinks')
const gallery = require('./gallery')


Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    siteurl: 'http://example.com/',
    description: 'It\'s about saying »Hello« to the world.',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/'
  })
  .source('./content')
  .destination('./dist')
  .clean(true)
  .use(gallery({
    photos: {
      title: 'Photos',
      gallery_layout: 'gallery.html',
      photo_layout: 'photo.html',
      source: 'photos.yml'
    }
  }))
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'nunjucks'
  }))
  .build(function(err) {
    if (err) throw err
  })
