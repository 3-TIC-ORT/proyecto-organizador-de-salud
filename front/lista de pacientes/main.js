connect2Server();

// --- Obtener elementos del DOM ---
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');

// --- Lista inicial ---
let pacientes = [];

// --- Cargar pacientes desde servidor ---
postEvent("cargarPacientesLista", { mail: localStorage.getItem("mail") }, (res) => {
    pacientes = res || [] || JSON.parse(localStorage.getItem('pacientes'));
    mostrarPacientes();
});

// -----------------------------------------------------------
// FUNCION PARA MOSTRAR PACIENTES
// -----------------------------------------------------------
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p>No hay pacientes guardados.</p>';
    return;
  }

  lista.forEach(p => {
    container.innerHTML += `
      <div class="paciente" data-mail="${p.mail}" data-nombre="${p.nombre}">
        <strong>${p.nombre}</strong>
        <button class="flechaTarjeta">&gt;</button>
      </div>
    `;
  });
}

// Mostrar lista al inicio
mostrarPacientes();

// -----------------------------------------------------------
// CLICK EN PACIENTE → PEDIR HISTORIAL
// -----------------------------------------------------------
container.addEventListener("click", (e) => {

  const verBtn = e.target.closest(".flechaTarjeta");
  if (!verBtn) return;

  const tarjeta = verBtn.closest(".paciente");

  const mailPaciente = tarjeta?.dataset.mail;
  const nombrePaciente = tarjeta?.dataset.nombre;

  const mailUsuario = localStorage.getItem("mail");

  // Guardamos el mail Y nombre del paciente para usar en la siguiente página
  localStorage.setItem("mailPacienteHistorial", mailPaciente);
  localStorage.setItem("nombrePacienteHistorial", nombrePaciente);

  // Usamos tu función real que ya funciona
  postEvent("historialFamiliar", { mailUsuario, mailPaciente }, (res) => {

    if (res.msg === "true") {
      window.location.href = "../historial pacientes desde medico info/index.html";
    } else {
      window.location.href = "../historial 2 copy medico/index.html";
    }

  });
});

// -----------------------------------------------------------
// BUSCADOR
// -----------------------------------------------------------
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase().trim();

  if (searchTerm === '') {
    mostrarPacientes();
    return;
  }

  const filtrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm)
  );

  if (filtrados.length === 0) {
    container.innerHTML = '<p>No se encontró ningún paciente.</p>';
  } else {
    mostrarPacientes(filtrados);
  }
});
