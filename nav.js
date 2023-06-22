/* global $ */
$('#hamburger').click(() => {
    document.getElementById('hamburger').classList.toggle('change')
    $('.nav-menu').toggle()
    // $(this).toggleClass("change");
})

$(window).resize(() => {
    if ($(window).width() > 1025) {
        $('.nav-menu').show()
    }
})

