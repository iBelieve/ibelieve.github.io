$(document).ready(function() {
  updateDates()
  setUpNavbar()
  setUpLinks()
  showGitHubStats()
})

function updateDates() {
  $('time').each(function() {
    const $this = $(this)
    const date = $this.attr('datetime')

    $this.text(relativeDate(date))
  })
}
