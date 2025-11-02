connect2Server();

let nombre = document.getElementById("nombre-abajo");



function asignarNombre(usuario){
    nombre.textContent = localStorage["usuario"]
}
asignarNombre();

let cerrarSesion = document.getElementById("cerrar-sesion");
cerrarSesion.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../iniciar sesion/index.html"
} );


let historial = document.getElementById("historial");
historial.addEventListener("click", () => {
    window.location.href = "../historial medico/index.html";
})
 let buscador = document.getElementById("buscador");
 buscador.addEventListener("click", () => {
    window.location.href = "../buscador de paciente/index.html";
})

let home = document.getElementById("home");
home.addEventListener("click", () => {
    window.location.href = "../home medico/index.html";
})