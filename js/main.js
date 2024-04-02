$(document).ready(function () {
//let artyom = new Artyom();

function buscarPokemon(nombre) {
    var url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();
    console.log("URL de búsqueda:", url);
    
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#imagen_pokemon").html('<img src="' + data.sprites.other.home.front_default + '">');
                $("#nombre-pokemon").text(data.name.toUpperCase());
                $("#pokemon-info").html(`
                        <p><strong>Altura:</strong> ${data.height / 10} m</p>
                        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                        <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
                        <p><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(", ")}</p>
                        <p><strong>Experiencia Base:</strong> ${data.base_experience}</p>
                        <p><strong>Estadísticas:</strong></p>
                        <ul>
                            ${data.stats.map(stat => `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join("")}
                        </ul>
                        <p><strong>Formas:</strong> ${data.forms.map(form => form.name).join(", ")}</p>
                        <p><strong>Movepool:</strong></p>
                        <ul>
                            ${data.moves.slice(0, 5).map(move => `<li>${move.move.name}</li>`).join("")}
                        </ul>
                    `);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 404) {
                Swal.fire({
                    title: 'PokeBusca dice',
                    text: 'El Pokémon que buscas no fue encontrado. Por favor, intenta con otro nombre.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'btn-black'
                    }
                });
            } else {
                Swal.fire({
                    title: 'PokeBusca dice',
                    text: 'Ha ocurrido un error: ' + textStatus,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'btn-black'
                    }
                });
            }
        }
    });
}



// Mostrar la sección de búsqueda de Pokémon al pulsar el botón Inicio
document.getElementById("btn-start").addEventListener("click", function () {
    document.getElementById("initial-screen").style.display = "none";
    document.getElementById("pokemon-search").style.display = "block";
});

    // Búsqueda por texto
    $("#btn-texto").on("click", function (){
        buscarPokemon($("#txt-buscar").val());
    });

// Búsqueda por voz
$("#btn-voz").on("click", function (){
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "es-ES"; // Establece el idioma a español
    recognition.start();
    
    recognition.onresult = function(event) {
        var resultado = event.results[0][0].transcript.toLowerCase();
        console.log("Resultado de la transcripción:", resultado);
        if (resultado.includes("buscar pokemon")) {
            var pokemon = resultado.replace("buscar pokémon ", "").trim();
            console.log("Pokémon a buscar:", pokemon);
            buscarPokemon(pokemon);
        } else {
            Swal.fire({
                title: 'PokeBusca dice',
                text: 'Comando no reconocido. Por favor, intenta de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'btn-black'
                }
            });
        }
    };
    
});




});