connect2Server();



let nombreTitulo = document.getElementById("nombre");



function asignarNombre(usuario){
    (nombreTitulo.textContent = localStorage["nombre"]) || (nombreTitulo.textContent = localStorage["usuario"]);
}

asignarNombre();


let historialCentro = document.getElementById("historial-centro");
historialCentro.addEventListener("click", () => {
    window.location.href = "../lista de pacientes/index.html"
});

let buscadorCentro = document.getElementById("buscador-centro");
buscadorCentro.addEventListener("click", () => {
    window.location.href = "../buscador de paciente/index.html"
});