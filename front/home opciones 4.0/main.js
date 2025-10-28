connect2Server()

let nombreprincipal = document.getElementById("nombre");

getEvent("nombreprincipal", asignarNombre);

function asignarNombre(usuario){
    nombreprincipal.textContent = usuario
}


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


