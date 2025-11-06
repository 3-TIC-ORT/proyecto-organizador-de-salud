connect2Server(); // asegurate de tener esto antes de usar postEvent/onEvent

// Recuperar ID del usuario logueado
const idusuario = localStorage.getItem('idusuario');

if (!idusuario) {
  alert("Tenés que iniciar sesión primero.");
  window.location.href = "login.html";
}

// Cargar pacientes guardados (de todos los usuarios)
let todosLosPacientes = JSON.parse(localStorage.getItem('pacientes')) || {};
// Si no hay lista para este usuario, crearla
if (!todosLosPacientes[idusuario]) todosLosPacientes[idusuario] = [];

// Lista actual del usuario
let pacientes = todosLosPacientes[idusuario];

// --- Elementos del DOM ---
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');
const formSection = document.getElementById('formSection');
const btnMostrarForm = document.getElementById('btnMostrarForm');
const formPaciente = document.getElementById('formPaciente');
const btnCancelar = document.getElementById('btnCancelar');

// --- Mostrar pacientes ---
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p>No hay pacientes para mostrar.</p>';
    return;
  }

  lista.forEach(p => {
    container.innerHTML += `
      <div class="paciente">
        <h4 class="nombreTarjeta">${p.nombre}</h4>
        <button class="flechaTarjeta">&gt;</button>
      </div>
    `;
  });
}

// --- Buscar paciente ---
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filtrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm)
  );
  mostrarPacientes(filtrados);
});

// --- Mostrar / ocultar formulario ---
btnMostrarForm.addEventListener('click', () => {
  formSection.classList.toggle('oculto');
});

// --- Guardar nuevo paciente ---
formPaciente.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombrePaciente').value.trim();
  const dni = document.getElementById('dniPaciente').value.trim();

  if (!nombre || !dni) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoPaciente = { nombre, dni };

  // Agregar al array del usuario actual
  pacientes.push(nuevoPaciente);

  // Actualizar estructura general y guardar en localStorage
  todosLosPacientes[idusuario] = pacientes;
  localStorage.setItem('pacientes', JSON.stringify(todosLosPacientes));

  // Enviar al backend (SoqueTIC)
  postEvent("pacientes", { idusuario, paciente: nuevoPaciente });

  formPaciente.reset();
  formSection.classList.add('oculto');
  mostrarPacientes();
});

// --- Botón cancelar ---
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto');
  formPaciente.reset();
});

// --- Al iniciar, pedir pacientes del backend ---
onEvent("pacientes", (data) => {
  if (data && data[idusuario]) {
    todosLosPacientes[idusuario] = data[idusuario];
    pacientes = data[idusuario];
    localStorage.setItem('pacientes', JSON.stringify(todosLosPacientes));
    mostrarPacientes();
  }
});

// Render inicial
mostrarPacientes();
