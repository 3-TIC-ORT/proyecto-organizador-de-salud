connect2Server();

// --- Variables globales ---
let pacientes = [];

// --- Elementos del DOM ---
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');
const formSection = document.getElementById('formSection');
const btnMostrarForm = document.getElementById('btnMostrarForm');
const formPaciente = document.getElementById('formPaciente');
const btnCancelar = document.getElementById('btnCancelar');

// --- Cargar pacientes desde el servidor ---
postEvent("cargarFamilia", { mail: localStorage.getItem("mail") }, (res) => {
  pacientes = res || [];
  mostrarPacientes();
});

// --- Función para mostrar los pacientes ---
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p>No se encontraron pacientes.</p>';
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

// --- Evento para buscar pacientes ---
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase().trim();

  if (searchTerm === '') {
    mostrarPacientes(); // Si está vacío, muestra todos
    return;
  }

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
  const dni = document.getElementById('dniPaciente').value.trim();

  if (!nombre || !dni) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoPaciente = { nombre, dni };

  // Agregar al array y guardar localmente
  pacientes.push(nuevoPaciente);
  localStorage.setItem('familia', JSON.stringify(pacientes));

  // Enviar al servidor
  const mail = localStorage.getItem("mail");
  postEvent("nuevaFamilia", { mail, nuevoPaciente });

  // Resetear formulario y actualizar vista
  formPaciente.reset();
  formSection.classList.add('oculto');
  mostrarPacientes();
});

// --- Botón cancelar ---
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto');
  formPaciente.reset();
});
