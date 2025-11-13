connect2Server();

// Mostrar nombre del usuario
let nombreprincipal = document.getElementById("nombreprincipal");

function asignarNombre() {
  nombreprincipal.textContent =
    localStorage["nombre"] || localStorage["usuario"] || "Usuario";
}
asignarNombre();

// Pedir datos al back por mail
postEvent("datosHistorial", { Mail: localStorage["mail"] }, cargarinfo);

// Función para procesar la info del back
function cargarinfo(data) {
  // "data" es un array de objetos (como el JSON que mandaste)
 

  const paciente = data[0]; // Tomamos el primer registro

  // Extraer los datos según tus campos del JSON
  const vacunaDoble = paciente["Vacuna doble adultos  DT (difteria y tetanos) o DTPa (vacunas difteria, tetanos y pertusis)"];
  const fechaDoble = paciente["Si se dio alguna en los ultimos 10 años, Anote cuando se dio la ultima dosis"];
  const vacunaHepatitis = paciente["Vacuna Hepatitis B"];
  const dosis3 = paciente["Recibió las 3 dosis"];
  const vacunaCovid = paciente["Vacuna Covid-19"];
  const fechaCovid = paciente["Cuando fue la última dosis"];

  // Seleccionamos los contenedores donde se mostrarán
  const aplicadasContainer = document.querySelector(".aplicada .botones");
  const pendientesContainer = document.querySelector(".pendiente");

  // Limpia lo que había antes
  aplicadasContainer.innerHTML = "";
  pendientesContainer.innerHTML = "";

  // Función auxiliar para crear botones de vacuna
  function crearBoton(vacuna, fecha) {
    const btn = document.createElement("button");
    btn.innerHTML = `
        <h3><span>${vacuna}</span></h3>
        <img src="VACUNA.png" alt="vacuna" class="vacuna">
        <h3 class="fecha"><span>${fecha}</span></h3>
        <img src="Vector.png" alt="fecha" class="vector">
    `;
    return btn;
  }

  // Mostrar vacunas aplicadas
  if (vacunaDoble === "Si") {
    aplicadasContainer.appendChild(crearBoton("Vacuna doble adultos", fechaDoble));
  } else {
    pendientesContainer.appendChild(crearBoton("Vacuna doble adultos", "Pendiente"));
  }

  if (vacunaHepatitis === "Si" && dosis3 === "Si") {
    aplicadasContainer.appendChild(crearBoton("Hepatitis B (3 dosis)", "Completa"));
  } else {
    pendientesContainer.appendChild(crearBoton("Hepatitis B", "Pendiente"));
  }

  if (vacunaCovid === "Si") {
    aplicadasContainer.appendChild(crearBoton("Covid-19", fechaCovid));
  } else {
    pendientesContainer.appendChild(crearBoton("Covid-19", "Pendiente"));
  }
}
