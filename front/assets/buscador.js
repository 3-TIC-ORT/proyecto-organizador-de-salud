// Lista inicial vacía
let pacientes = [];

// Elementos del DOM
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');
const formSection = document.getElementById('formSection');
const btnMostrarForm = document.getElementById('btnMostrarForm');
const formPaciente = document.getElementById('formPaciente');
const btnCancelar = document.getElementById('btnCancelar');

// --- Función para mostrar los pacientes ---
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p>No hay pacientes para mostrar.</p>';
    return;
  }

  lista.forEach(p => {
    container.innerHTML += `
      <div class="paciente">
        <h4>${p.nombre}</h4>
        
      </div>
    `;
  });
}

// --- Evento para buscar ---
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

// --- Agregar nuevo paciente ---
formPaciente.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombrePaciente').value.trim();
  const mail = document.getElementById('mailPaciente').value.trim();
  const contraseña = document.getElementById('contraseñaPaciente').value.trim();

  if (!nombre || !mail || !contraseña) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoPaciente = { nombre, mail, contraseña };
  pacientes.push(nuevoPaciente);

  formPaciente.reset();
  formSection.classList.add('oculto'); // Oculta el formulario después de agregar
  mostrarPacientes(); // Actualiza la lista
});

// --- Botón cancelar ---
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto'); // oculta el formulario
  formPaciente.reset(); // limpia los inputs
});
