'use stirct'

window.addEventListener('load', () => {
    geolocalizacion();

    let form_encuesta = document.querySelector("#pase");

    $("#pase").on('submit', function(e) {
        e.preventDefault();


        let datos = new FormData(this);
        console.log(...datos);


        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: datos,
            dataType: "json",
            contentType: false,
            processData: false,
            async: true,
            cache: false,
            success: function(response) {
                if (response.respuesta === "correcto") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registro correcto',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                    form_encuesta.reset();
                }
            }
        });



    });

    function geolocalizacion() {

        let options = {
            EnableHighAccuracy: true,
            Timeout: 1000,
            MaximunAge: 0
        }

        if (navigator.geolocation) {
            console.log("Acepta coordenadas");

            navigator.geolocation.watchPosition(success, error, options);
        } else {
            console.log("No soporta geolocalizacion");
        }

        function success(geolocalizacionPosicion) {

            let divEvidencias = document.querySelector("#pase");
            let lat = geolocalizacionPosicion.coords.latitude;
            let longitud = geolocalizacionPosicion.coords.longitude;

            let inLatitud = document.createElement('input');
            inLatitud.setAttribute("value", lat);
            inLatitud.setAttribute("name", "latitud");
            inLatitud.setAttribute("type", "hidden");

            let inLongitud = document.createElement('input');
            inLongitud.setAttribute("value", longitud);
            inLongitud.setAttribute("name", "longitud");
            inLongitud.setAttribute("type", "hidden");

            divEvidencias.appendChild(inLatitud);
            divEvidencias.appendChild(inLongitud);



            console.log(`Latitud ${lat}, Longitud ${longitud}`);

        }

        function error() {
            alert("No se puede obtener las coordenadas");
        }
    }

});