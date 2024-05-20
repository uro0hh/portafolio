let menuVisisble = false;

function mostraeOcultarMenu(){
    if(menuVisisble){
        document.getElementById("nav").classList ="";
        menuVisisble = false
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisisble = true;
    }
}




const ciudadInput = document.getElementById('ciudad');
const obtenerPronosticoBtn = document.getElementById('obtenerPronostico');
const pronosticoDiv = document.getElementById('pronostico');


obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

function obtenerPronostico() {
   
    const ciudad = ciudadInput.value.trim();
    
    if (ciudad === '') {
        mostrarError('Por favor, ingresa una ciudad');
        return;
    }
    

    const apiKey = 'a2b3b130836df2b29363946fccb90e93'; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    

    fetch(url)

        .then(response => response.json())
        .then(data => {

            mostrarPronostico(data);
        })
        .catch(error => {
            mostrarError('Error al obtener el pronóstico. Por favor, intenta nuevamente.');
        });
}


function mostrarPronostico(data) {
    const { name, main, weather } = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;
    

    console.log(data);
    

    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}°C</p>
                <p class="card-text">Sensación de: ${sensacion}°C</p>
                <p class="card-text">Humedad de un: ${humedad}%</p>
                <p class="card-text">Descripción: ${descripcion}</p>
            </div>
        </div>
    `;
    

    pronosticoDiv.innerHTML = pronosticoHTML;
}


function mostrarError(mensaje) {

    const errorHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
    

    pronosticoDiv.innerHTML = errorHTML;
}

