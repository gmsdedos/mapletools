$(document).ready(function() {
    const sections = ['section1', 'section2', 'section3', 'afterlands']; // Lista de secciones

    sections.forEach(section => {
        $('#content').load(`sections/${section}.html`, function(response, status, xhr) {
            if (status == "error") {
                $('#content').append(`<p>Error al cargar la sección ${section}: ${xhr.status} ${xhr.statusText}</p>`);
            }
        });
    });

    // Smooth scroll for navigation
    $('.nav-link').click(function(event) {
        event.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });
});
