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


$(document).ready(function() {
    // Función para cargar el estado de los checkboxes desde localStorage al cargar la página
    function loadCheckboxState() {
        // Cargar el estado para la guía en inglés
        $('#guideEnglish .guide-step').each(function() {
            var checkboxId = $(this).find('input[type="checkbox"]').attr('id');
            var isChecked = localStorage.getItem(checkboxId) === 'true';
            $(this).find('input[type="checkbox"]').prop('checked', isChecked);
            updateDivBackground($(this).find('input[type="checkbox"]'));
        });

        // Cargar el estado para la guía en español
        $('#guideSpanish .guide-step').each(function() {
            var checkboxId = $(this).find('input[type="checkbox"]').attr('id');
            var isChecked = localStorage.getItem(checkboxId) === 'true';
            $(this).find('input[type="checkbox"]').prop('checked', isChecked);
            updateDivBackground($(this).find('input[type="checkbox"]'));
        });
    }

    // Al cargar la página, cargar el estado de los checkboxes desde localStorage
    loadCheckboxState();

    // Al hacer clic en un paso de la guía en inglés
    $('#guideEnglish .guide-step').click(function() {
        var checkbox = $(this).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        updateDivBackground(checkbox);
        saveCheckboxState(checkbox);
    });

    // Al hacer clic en un paso de la guía en español
    $('#guideSpanish .guide-step').click(function() {
        var checkbox = $(this).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        updateDivBackground(checkbox);
        saveCheckboxState(checkbox);
    });

    // Función para guardar el estado del checkbox en localStorage
    function saveCheckboxState(checkbox) {
        var checkboxId = checkbox.attr('id');
        var isChecked = checkbox.prop('checked');
        localStorage.setItem(checkboxId, isChecked);
    }

    // Al hacer clic en el botón de resetear
    $('#reset-checkboxes').click(function() {
        // Resetear todos los checkboxes
        $('input[type="checkbox"]').each(function() {
            $(this).prop('checked', false);
            updateDivBackground($(this));
            var checkboxId = $(this).attr('id');
            localStorage.setItem(checkboxId, false);
        });
    });

    // Función para actualizar el fondo del div basado en el estado del checkbox
    function updateDivBackground(checkbox) {
        var div = checkbox.parent();
        if (checkbox.prop('checked')) {
            div.removeClass('unchecked').addClass('checked');
        } else {
            div.removeClass('checked').addClass('unchecked');
        }
    }
});
