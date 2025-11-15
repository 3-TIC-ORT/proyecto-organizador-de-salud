// --- Obtener elementos del DOM ---
const container = document.getElementById('pacienteContainer');
const searchBar = document.getElementById('searchBar');

// --- Cargar pacientes desde localStorage ---
const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

postEvent("cargarPacientesLista", { mail: localStorage.getItem("mail") }, (res) => {
    pacientes = res || [] || JSON.parse(localStorage.getItem('pacientes'));
    mostrarPacientes();
  });

// --- Función para mostrar los pacientes ---
function mostrarPacientes(lista = pacientes) {
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p>No hay pacientes guardados.</p>';
    return;
  }

  lista.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('paciente');
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      <button class="flechaTarjeta">&gt;</button>
    `;
    container.appendChild(div);
  });
}

// --- Mostrar pacientes al cargar la página ---
mostrarPacientes();

// --- Filtro por nombre ---
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
