$(document).ready(function() {
  updateNavbar()
  $(document).scroll(updateNavbar)
})

function updateNavbar() {
  const bio = $('.bio')
  const basePosition = bio.length > 0 ? bio.height() : 0
  const isScrolled = $(document).scrollTop() > basePosition

  $('.navbar').toggleClass('navbar--floating', isScrolled)
}
