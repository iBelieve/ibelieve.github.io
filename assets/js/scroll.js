function setUpLinks() {
  $('a[href^="#"]').click(function() {
    const link = $(this).attr('href')

    console.log($('.navbar').height() + 32)

    $('html, body').animate({
      scrollTop: $(link).offset().top - $('.navbar').height() - 32
    }, 500, function() {
      window.history.pushState(null, null, link)
    })

    return false
  })
}
