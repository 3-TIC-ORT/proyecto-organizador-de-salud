connect2Server()


let home = document.getElementById("home");
home.addEventListener("click", () => {
    window.location.href = "../home opciones 4.0/index.html";
});
 let historial = document.getElementById("historial");
historial.addEventListener("click", () => {
    window.location.href = "../historial/index.html"
});
let calendario = document.getElementById("calendario");
calendario.addEventListener("click", () => {
    window.location.href = "../prueba2 cal/index.html"
});
let grupofam = document.getElementById("grupofam");
grupofam.addEventListener("click", () => {
    window.location.href = "../grupo familiar final/index.html"
});
let mapa = document.getElementById("mapa");
mapa.addEventListener("click", () => {
    window.location.href = "../mapa 2.0/index.html"
});


let nombre = document.getElementById("nombre-abajo");



function asignarNombre(usuario){
    (nombre.textContent = localStorage["nombre"]) || (nombre.textContent = localStorage["usuario"]);
}
asignarNombre();

let cerrarSesion = document.getElementById("cerrar-sesion");
cerrarSesion.addEventListener("click",() =>{
    localStorage.clear();
    window.location.href = "../iniciar sesion/index.html"
} )