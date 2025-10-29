connect2Server()

let nombreprincipal = document.getElementById("nombre");

getEvent("nombreprincipal", asignarNombre);

function asignarNombre(usuario){
    nombreprincipal.textContent = localStorage["usuario"];
}

asignarNombre();

// Mensaje para confirmar que el script se cargó
console.log("fecha.js cargado");

// Arrays de nombres en español
const meses = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];
const diasSemana = [
  "domingo","lunes","martes","miércoles","jueves","viernes","sábado"
];

// Función que devuelve la fecha formateada
function obtenerTextoFecha(fecha = new Date()) {
  
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  return ` ${dia} de ${mes} de ${año}`;
}

// Poner la fecha en el h2 (esperamos que el DOM esté listo porque usamos "defer")
const el = document.getElementById("fechaActual");
if (el) {
  el.textContent = obtenerTextoFecha();
  console.log(obtenerTextoFecha())
} else {
  console.error("No se encontró el elemento #fechaActual en el DOM");
}

let historialCentro = document.getElementById("historial-centro");
historialCentro.addEventListener("click", () => {
  window.location.href = "../historial/index.html"
});

let grupofamCentro = document.getElementById("grupofam-centro");
grupofamCentro.addEventListener("click", () => {
  window.location.href = "../grupo familiar 2.0/index.html"
});

let mapaCentro = document.getElementById("mapa-centro");
mapaCentro.addEventListener("click", () => {
  window.location.href = "../mapa 2.0/index.html"
});

let calendarioCentro = document.getElementById("calendario-centro");
calendarioCentro.addEventListener("click", () => {
  window.location.href = "../prueba2 cal/index.html"
});


