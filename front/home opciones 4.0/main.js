connect2Server()

let nombre = document.getElementById("nombre");

getEvent("nombre", asignarNombre);

function asignarNombre(usuario){
    nombre.textContent = usuario
}

