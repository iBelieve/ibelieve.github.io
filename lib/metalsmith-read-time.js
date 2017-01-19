const path = require('path')
const htmlToText = require('html-to-text')
const wordCount = require('wordcount')
const cheerio = require('cheerio')
const _ = require('lodash')

const READING_RATE = 250 // Words/minute

function plugin(options) {
	return function(files, metalsmith, done) {
		setImmediate(done);

    for (const [file, data] of Object.entries(files)) {
      if (!isHTML(file))
        continue;

      const $ = cheerio.load(data.contents)

      const wordCount = htmlWordCount(data.contents)
      const wordReadTime = (wordCount/READING_RATE) * 60

      const codeCount = $('pre').length
      const codeReadTime = codeCount * 10

      const imageCount = $('img').length
      const imagesReadTime = _.times(imageCount)
        .reduce((total, index) => total + imageReadTime(index), 0)

      const totalSeconds = wordReadTime + codeReadTime + imagesReadTime

      const minutes = Math.round(totalSeconds/60)

      data.readTime = `${minutes} min read`
    }
	};
}

function imageReadTime(index) {
  return Math.max(3, 12 - index)
}

function htmlWordCount(body) {
  var text = htmlToText.fromString(body, {
    wordwrap: false,
    ignoreImage: true,
    ignoreHref: true
  });

  return wordCount(text);
}

// Check if filename is HTML
function isHTML(file) {
	return path.extname(file) == ".html";
}

module.exports = plugin;
