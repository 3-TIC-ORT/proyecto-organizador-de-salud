connect2Server();


// Lista inicial vacía
let pacientes = [];

// --- Variables globales ---


// Elementos del DOM
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');
const formSection = document.getElementById('formSection');
const btnMostrarForm = document.getElementById('btnMostrarForm');
const formPaciente = document.getElementById('formPaciente');
const btnCancelar = document.getElementById('btnCancelar');

// --- Cargar pacientes desde el servidor ---
postEvent("cargarPacientes", { mail: localStorage.getItem("mail") }, (res) => {
    pacientes = res || [] || JSON.parse(localStorage.getItem('pacientes'));
    mostrarPacientes();
  });

//funcion para mostrar los pacientes
function mostrarPacientes(lista = pacientes) {
    container.innerHTML = '';
  
    if (!lista || lista.length === 0) {
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
  const dni = document.getElementById('dniPaciente').value.trim();

  if (!nombre || !dni) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoPaciente = { nombre, dni };
  pacientes.push(nuevoPaciente);
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  formPaciente.reset();
  formSection.classList.add('oculto'); // Oculta el formulario después de agregar
  mostrarPacientes(); // Actualiza la lista
  postEvent("nuevoPaciente", { 
    mail: localStorage.getItem("mail"), 
    nuevoPaciente 
});
});

// --- Botón cancelar ---
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto'); // oculta el formulario
  formPaciente.reset(); // limpia los inputs
});

mostrarPacientes();
