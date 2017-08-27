$(document).ready(function() {
  updateDates()
  setUpNavbar()
  setUpLinks()
})

function updateDates() {
  $('time').each(function() {
    const $this = $(this)
    const date = $this.attr('datetime')

    $this.text(relativeDate(date))
  })
}
