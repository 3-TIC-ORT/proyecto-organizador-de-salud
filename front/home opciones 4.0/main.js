connect2Server()

let nombres = document.getElementById("nombre");

getEvent("nombre", asignarNombre);

function asignarNombre(nombre){
    nombres.textContent = nombre
}

