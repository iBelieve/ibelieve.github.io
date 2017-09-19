function showGitHubStats() {
  var $aside = $('.page-home__aside')

  if ($aside.length != 1) return

  fetchTopLanguages().then(topLanguages => {
    $aside.append(`
      <h2>Top 5 Languages on GitHub</h2>
      <ul class="page-home__languages">
        ${topLanguages
          .map(
            ([language, count]) => `
            <li class="${languageClass(language)}" data-count="${count}">
              <a href="${languageUrl(language)}" target="_blank">${language}</a>
            </li>
          `
          )
          .join('')}
      </u>
    `)
  })

  fetchPinnedRepositories().then(pinnedRepos => {
    $aside.append(`
      <h2>Highlighted Projects</h2>
      <ul class="page-home__repos">
        ${pinnedRepos
          .map(
            repo => `
            <li class="${languageClass(repo.language)}" data-stars="${repo.stars}">
              <a href="${repositoryUrl(repo)}" target="_blank">${repo.name}</a>
            </li>
          `
          )
          .join('')}
      </u>
    `)
  })
}

function repositoryUrl(repo) {
  return `https://github.com/iBelieve/${repo.name}`
}

function languageUrl(language) {
  language = language.toLowerCase().replace(/\+/g, '%2B')
  return `https://github.com/iBelieve?tab=repositories&language=${language}`
}

function languageClass(language) {
  return (
    'language--' +
    language
      .toLowerCase()
      .replace('++', 'pp')
      .replace('#', 'sharp')
      .replace(/[^\w]+/g, ' ')
      .split(' ')
      .join('')
  )
}

function fetchTopLanguages() {
  return fetch('https://api.github.com/users/iBelieve/repos')
    .then(response => response.json())
    .then(repos =>
      _.chain(repos)
        .countBy(repo => repo.language)
        .toPairs()
        .orderBy(['1'], ['desc'])
        .slice(0, 5)
        .value()
    )
}

function fetchPinnedRepositories() {
  return fetch('https://gh-pins.now.sh/?username=iBelieve').then(response => response.json())
}
