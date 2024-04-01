$(document).ready(function () {
    $("#btn-texto").on("click", function (){
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+$("#txt-buscar").val(),
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                console.log(data.sprites.other.home.front_default)
                $("#imagen_pokemon").html('<img src="' + data.sprites.other.home.front_default + '">');
//quedé en el minuto 43:25
            }
        })
    })
})
