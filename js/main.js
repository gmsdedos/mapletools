// scripts/main.js

$(document).ready(function() {
    // Array de objetos que define las secciones y sus enlaces
    var sections = [
        { name: "Afterlands", url: "sections/afterlands.html" },
        // Agrega más secciones según sea necesario
    ];

    var menu = $('#menu');
    var mainContent = $('#main-content');

    // Función para cargar una sección específica
    function loadSection(sectionUrl) {
        $.ajax({
            url: sectionUrl,
            method: 'GET',
            success: function(data) {
                mainContent.html(data);
            },
            error: function() {
                mainContent.html('<p>Error al cargar la sección.</p>');
            }
        });
    }

    // Generar dinámicamente los enlaces del menú
    sections.forEach(function(section) {
        var listItem = $('<li><a href="#">' + section.name + '</a></li>');
        listItem.find('a').click(function(e) {
            e.preventDefault();
            loadSection(section.url);
        });
        menu.append(listItem);
    });

    // Cargar la primera sección por defecto al cargar la página
    if (sections.length > 0) {
        loadSection(sections[0].url);
    }
});
