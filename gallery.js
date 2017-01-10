const YAML = require('yamljs')
const path = require('path')

module.exports = plugin;

/**
 * Generate one or more photo galleries with an index page and a page for each photo.
 */
function plugin(galleries) {
  return function(files, metalsmith, done) {
    setImmediate(done)

    for (const [name, config] of Object.entries(galleries)) {
      const photos = YAML.load(path.resolve(metalsmith._directory, metalsmith._source,
                                            config.source))

      photos.forEach(photo => {
        photo.filename = photo.title.toLowerCase().replace(/\s+/g, '-')

        const file = {
          title: photo.title,
          layout: config.photo_layout,
          contents: new Buffer(photo.description || '')
        }
        files[`${name}/${photo.filename}.md`] = file
      })

      files[`${name}/index.html`] = {
        title: config.title,
        layout: config.gallery_layout,
        photos: photos,
        contents: new Buffer('')
      }

      delete files[config.source]
    }
  }
}
