$(document).ready(function() {
    // Cargar contenido de las secciones
    $('#content').load('sections/afterlands.html', function(response, status, xhr) {
        if (status == "error") {
            $('#content').append(`<p>Error al cargar la sección: ${xhr.status} ${xhr.statusText}</p>`);
        } else {
            loadGuide('en');
        }
    });

    // Smooth scroll para la navegación
    $('.nav-link').click(function(event) {
        event.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });

    // Función para cargar la guía
    function loadGuide(lang) {
        $.getJSON('data/guide.json', function(data) {
            let guideContent = '';
            data[lang].forEach(section => {
                guideContent += `<div class="guide-section">
                    <h3>${section.title}</h3>`;
                section.steps.forEach(step => {
                    guideContent += `<div class="step">
                        <input type="checkbox" class="step-checkbox">
                        <span class="step-text">${step}</span>
                    </div>`;
                });
                guideContent += `</div>`;
            });
            $('#guide-container').html(guideContent);

            // Aplicar color de fondo a los pasos según el estado del checkbox
            $('.step-checkbox').change(function() {
                if (this.checked) {
                    $(this).closest('.step').css('background-color', '#006400');
                } else {
                    $(this).closest('.step').css('background-color', '#8b0000');
                }
            });

            // Inicializar color de fondo de los pasos
            $('.step').css('background-color', '#8b0000');
        }).fail(function() {
            console.log('Error al cargar el archivo JSON.');
        });
    }

    // Cambiar de idioma
    $('#content').on('click', '#switch-to-en', function() {
        loadGuide('en');
    });

    $('#content').on('click', '#switch-to-es', function() {
        loadGuide('es');
    });
});
