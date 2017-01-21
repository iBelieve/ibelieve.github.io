$(document).ready(function() {
  $(document).scroll(function() {
    const bio = $('.bio')
    const basePosition = bio.length > 0 ? bio.height() : 0
    const isScrolled = $(document).scrollTop() > basePosition

    $('.navbar').toggleClass('navbar--floating', isScrolled)
  })
})
