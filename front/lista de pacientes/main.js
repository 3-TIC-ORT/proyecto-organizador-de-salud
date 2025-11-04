


const listaPacientes = document.getElementById('listaPacientes');


// Cargar pacientes del localStorage
const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

// Mostrar los pacientes guardados
if (pacientes.length === 0) {
    listaPacientes.innerHTML = '<p>No hay pacientes guardados.</p>';
  } else {
    pacientes.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('paciente');
      div.innerHTML = `<strong>${p.nombre}</strong><br>DNI: ${p.dni}`;
      listaPacientes.appendChild(div);
    });
  }
