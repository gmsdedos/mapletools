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
            div.css('background-color', '#4CAF50'); // Verde oscuro si está checkeado
        } else {
            div.css('background-color', '#E57373'); // Rojo oscuro si no está checkeado
        }
    }
});



$(document).ready(function() {
    var guideContainer = $('#guide-container');
    var resetCheckboxesBtn = $('#reset-checkboxes');

    // Función para cargar la guía desde guide.js
    function loadGuide() {
        // Aquí se cargaría dinámicamente el contenido de guide.js
        // Supongamos que guide.js contiene un objeto o datos estructurados
        var guideData = {
            sections: [
                { title: "Land of Beginnings", steps: ["Step 1", "Step 2", "Step 3"] },
                { title: "Land of Warriors", steps: ["Step 1", "Step 2", "Step 3"] },
                { title: "Land of Riches", steps: ["Step 1", "Step 2", "Step 3"] },
                // Agrega más secciones según sea necesario
            ]
        };

        // Generar el HTML para mostrar la guía
        var guideHTML = '';
        guideData.sections.forEach(function(section, index) {
            guideHTML += '<div class="guide-section">';
            guideHTML += '<button class="btn btn-link btn-toggle" data-toggle-index="' + index + '">' + section.title + '</button>';
            guideHTML += '<div class="collapse" id="collapse-' + index + '">';
            guideHTML += '<ul>';
            section.steps.forEach(function(step) {
                guideHTML += '<li>' + step + '</li>';
            });
            guideHTML += '</ul>';
            guideHTML += '</div>'; // Cierre de collapse
            guideHTML += '</div>'; // Cierre de guide-section
        });

        guideContainer.html(guideHTML);

        // Agregar funcionalidad de colapso
        $('.btn-toggle').click(function() {
            var toggleIndex = $(this).data('toggle-index');
            $('#collapse-' + toggleIndex).collapse('toggle');
        });
    }

    // Cargar la guía al cargar la página
    loadGuide();

    // Evento para resetear checkboxes
    resetCheckboxesBtn.click(function() {
        // Aquí deberías implementar la lógica para resetear los checkboxes
        // Por ejemplo, desmarcar todos los checkboxes en la guía
        $('.guide-section input[type="checkbox"]').prop('checked', false);
    });

    // Eventos para cambiar el idioma (a implementar según tus necesidades)
    $('#switch-to-en').click(function() {
        // Implementa el cambio a inglés si es necesario
    });

    $('#switch-to-es').click(function() {
        // Implementa el cambio a español si es necesario
    });
});
