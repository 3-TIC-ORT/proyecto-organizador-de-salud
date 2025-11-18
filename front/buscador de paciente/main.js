connect2Server();

// Lista inicial vacía
let pacientes = [];

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

// -----------------------------------------------------------
// FUNCION PARA MOSTRAR PACIENTES
// -----------------------------------------------------------
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p>No hay pacientes para mostrar.</p>';
    return;
  }

  lista.forEach(p => {
    container.innerHTML += `
      <div class="paciente" data-mail="${p.mail}">
        <h4 class="nombreTarjeta">${p.nombre}</h4>
        <button class="flechaTarjeta">&gt;</button>
        <button class="btnEliminar" data-mail="${p.mail}">🗑️</button>
      </div>
    `;
  });
}

// -----------------------------------------------------------
// BOTÓN ELIMINAR
// -----------------------------------------------------------
container.addEventListener("click", (e) => {
  
  // --- ELIMINAR ---
  const eliminarBtn = e.target.closest(".btnEliminar");
  if (eliminarBtn) {
    const mailPaciente = eliminarBtn.dataset.mail;
    const mailUsuario = localStorage.getItem("mail");

    postEvent("eliminarPaciente", { mail: mailUsuario, mailPaciente }, (actualizado) => {
      pacientes = actualizado;
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      mostrarPacientes();
    });
    return;
  }

  // --- VER HISTORIAL → CLICK EN FLECHA ---
  const verBtn = e.target.closest(".flechaTarjeta");
  if (verBtn) {
    const tarjeta = verBtn.closest(".paciente");
    const mailPaciente = tarjeta?.getAttribute("data-mail");
    const mailUsuario = localStorage.getItem("mail");

    // Enviar al back
    postEvent("historialFamiliar", { mailUsuario, mailPaciente }, (res) => {
      // Guardar mail del paciente para usar en la página de historial
      localStorage.setItem("mailPacienteHistorial", mailPaciente);

      if (res.msg == "true") {
        window.location.href = "../historial pacientes desde medico info/index.html";
      } else {
        window.location.href = "../historial 2 copy medico/index.html";
      }
    });
  }
});

// -----------------------------------------------------------
// BUSCADOR
// -----------------------------------------------------------
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filtrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm)
  );
  mostrarPacientes(filtrados);
});

// -----------------------------------------------------------
// MOSTRAR / OCULTAR FORMULARIO
// -----------------------------------------------------------
btnMostrarForm.addEventListener('click', () => {
  formSection.classList.toggle('oculto');
});

// -----------------------------------------------------------
// AGREGAR NUEVO PACIENTE
// -----------------------------------------------------------
formPaciente.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombrePaciente').value.trim();
  const mailPaciente = document.getElementById('dniPaciente').value.trim();

  if (!nombre || !mailPaciente) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  postEvent("checkUsuarioPorMail", { mail: mailPaciente }, (res) => {

    if (!res || res.msg !== true) {
      alert("No existe un usuario registrado con ese mail.");
      return;
    }

    const nuevoPaciente = { nombre, mail: mailPaciente };

    pacientes.push(nuevoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    formPaciente.reset();
    formSection.classList.add('oculto');
    mostrarPacientes();

    postEvent("nuevoPaciente", { 
      mail: localStorage.getItem("mail"), 
      nuevoPaciente 
    });
  });
});

// -----------------------------------------------------------
// BOTÓN CANCELAR
// -----------------------------------------------------------
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto');
  formPaciente.reset();
});

// Dibujar la lista al inicio
mostrarPacientes();
