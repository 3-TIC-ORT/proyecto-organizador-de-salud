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
    // cada tarjeta incluye un botón eliminar con data-mail para identificar
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
    mostrarPacientes(); // Si está vacío, muestra todos
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

  // 1) Verificar que NO exista ya en el front
  const existe = pacientes.some(p => p.mail === mailPaciente);
  if (existe) {
    alert("Ya existe un paciente con ese mail.");
    return;
  }

  // 2) CONSULTAR AL BACK SI EXISTE UN USUARIO CON ESE MAIL
  postEvent("checkUsuarioPorMail", { mail: mailPaciente }, (res) => {

    // --- Según cómo responda el back ---
    if (!res || res.msg !== true) {
      alert("No existe un usuario registrado con ese mail.");
      return;
    }

    // 3) Si el usuario existe → crear familiar
    const nuevoPaciente = { nombre, mail: mailPaciente };

    pacientes.push(nuevoPaciente);
    localStorage.setItem('familia', JSON.stringify(pacientes));

    // 4) Mandar al servidor que se agregó un familiar
    const mail = localStorage.getItem("mail");
    postEvent("nuevaFamilia", { mail, nuevoPaciente });

    // 5) Limpiar formularios y actualizar vista
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

// --- Delegación de eventos en container para manejar eliminar (y otras acciones) ---
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

  // aquí podrías manejar click en la flecha para "ver" detalles, etc.
  const verBtn = e.target.closest('.flechaTarjeta');
  if (verBtn) {
    const tarjeta = verBtn.closest('.paciente');
    const mailPaciente = tarjeta?.getAttribute('data-mail');
    // ejemplo: abrir detalle -> implementar según lo que necesites
    console.log('Ver paciente:', mailPaciente);
    postEvent("historialFamiliar", { mailUsuario, mailPaciente }, (res) => {
      if(res.msg == "true"){
        window.location.href = "../historial familiar/index.html"
      }
    })
  }
});

// --- Función para eliminar paciente ---
function eliminarPaciente(mailPaciente) {
  // confirmación
  const confirmar = confirm(`¿Eliminar al paciente con mail "${mailPaciente}"? Esta acción no se puede deshacer.`);
  if (!confirmar) return;

  // Filtrar el array
  const nuevos = pacientes.filter(p => p.mail !== mailPaciente);

  // Si no cambió nada, salir
  if (nuevos.length === pacientes.length) {
    alert('No se encontró el paciente.');
    return;
  }

  pacientes = nuevos;

  // Guardar en localStorage
  localStorage.setItem('familia', JSON.stringify(pacientes));

  // Enviar evento al servidor (identificando al paciente por su mail)
  const mail = localStorage.getItem("mail");
  postEvent("eliminarFamilia", { mail, mailPaciente });

  // Actualizar vista
  mostrarPacientes();
}
