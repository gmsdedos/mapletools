
$(document).ready(function() {
    const sections = ['section1', 'section2', 'section3']; // Lista de secciones

    sections.forEach(section => {
        $('#content').load(`sections/${section}.html`, function(response, status, xhr) {
            if (status == "error") {
                $('#content').append(`<p>Error al cargar la sección ${section}: ${xhr.status} ${xhr.statusText}</p>`);
            }
        });
    });
});
