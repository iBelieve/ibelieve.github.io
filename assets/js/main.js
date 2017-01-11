$(document).ready(function() {
  $('time').each(function() {
    const $this = $(this)
    const date = $this.attr('datetime')

    $this.text(relativeDate(date))
  })
})
