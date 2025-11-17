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
      <div class="paciente" data-mail="${p.mail}">
        <div class="info-paciente">
          <h4 class="nombreTarjeta">${p.nombre}</h4>
        </div>

        <div class="acciones-tarjeta">
          <button class="flechaTarjeta" aria-label="Ver">&#62;</button>
          <button class="btn-eliminar" aria-label="Eliminar" title="Eliminar paciente">🗑️</button>
        </div>
      </div>
    `;
  });
}

// --- Evento para buscar pacientes ---
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase().trim();

  if (searchTerm === '') {
    mostrarPacientes();
    return;
  }

  const filtrados = pacientes.filter(p =>
    (p.nombre && p.nombre.toLowerCase().includes(searchTerm)) ||
    (p.mail && p.mail.toLowerCase().includes(searchTerm))
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
  const mailPaciente = document.getElementById('mailPaciente').value.trim().toLowerCase();

  localStorage.setItem("mailFamilia", mailPaciente);

  if (!nombre || !mailPaciente) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const existe = pacientes.some(p => p.mail === mailPaciente);
  if (existe) {
    alert("Ya existe un paciente con ese mail.");
    return;
  }

  postEvent("checkUsuarioPorMail", { mail: mailPaciente }, (res) => {

    if (!res || res.msg !== true) {
      alert("No existe un usuario registrado con ese mail.");
      return;
    }

    const nuevoPaciente = { nombre, mail: mailPaciente };

    pacientes.push(nuevoPaciente);
    localStorage.setItem('familia', JSON.stringify(pacientes));

    const mail = localStorage.getItem("mail");
    postEvent("nuevaFamilia", { mail, nuevoPaciente });

    formPaciente.reset();
    formSection.classList.add('oculto');
    mostrarPacientes();
  });
});

// --- Botón cancelar ---
btnCancelar.addEventListener('click', () => {
  formSection.classList.add('oculto');
  formPaciente.reset();
});

const mailUsuario = localStorage.getItem("mail");

// --- Delegación de eventos en container ---
container.addEventListener('click', (e) => {
  const eliminarBtn = e.target.closest('.btn-eliminar');
  if (eliminarBtn) {
    const tarjeta = eliminarBtn.closest('.paciente');
    if (!tarjeta) return;
    const mailPaciente = tarjeta.getAttribute('data-mail');
    if (!mailPaciente) return;
    eliminarPaciente(mailPaciente);
    return;
  }

  // 🔵 --- CAMBIO: entrar al historial del familiar ---
  const verBtn = e.target.closest('.flechaTarjeta');
  if (verBtn) {
    const tarjeta = verBtn.closest('.paciente');
    const mailPaciente = tarjeta?.getAttribute('data-mail');

    /* 🔵 CAMBIO: envío datos al back */
    postEvent("historialFamiliar", { mailUsuario, mailPaciente }, (res) => {
      if (res.msg == "true") {

        /* 🔵 CAMBIO: guardo el mail del paciente que quiero ver */
        localStorage.setItem("mailPacienteHistorial", mailPaciente);

        /* 🔵 CAMBIO: redirección */
        window.location.href = "../historial familiar/index.html";
      }
    });
  }
});

// --- Función para eliminar paciente ---
function eliminarPaciente(mailPaciente) {
  const confirmar = confirm(`¿Eliminar al paciente con mail "${mailPaciente}"?`);
  if (!confirmar) return;

  const nuevos = pacientes.filter(p => p.mail !== mailPaciente);

  if (nuevos.length === pacientes.length) {
    alert('No se encontró el paciente.');
    return;
  }

  pacientes = nuevos;

  localStorage.setItem('familia', JSON.stringify(pacientes));

  const mail = localStorage.getItem("mail");
  postEvent("eliminarFamilia", { mail, mailPaciente });

  mostrarPacientes();
}
