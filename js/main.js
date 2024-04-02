$(document).ready(function () {
    $("#btn-texto").on("click", function (){
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+$("#txt-buscar").val(),
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
            }
        })
    })
})
