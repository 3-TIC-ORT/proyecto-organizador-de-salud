const patientListEl = document.getElementById("patientList");
const searchInput = document.getElementById("searchInput");
const addForm = document.getElementById("addPatientForm");
const newPatientInput = document.getElementById("newPatientName");
const themeToggle = document.getElementById("themeToggle");

let patients = JSON.parse(localStorage.getItem("patients")) || [
  "Juan Lopez",
  "María Perez",
  "Laura Ramirez",
  "Pedro Castillo",
  "Sofía Mendoza",
  "Andrés Torres"
];

// Renderizar pacientes
function renderPatients(filter = "") {
  patientListEl.innerHTML = "";
  patients
    .filter(name => name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(name => {
      const li = document.createElement("li");
      li.className = "patient-item";
      li.innerHTML = `
        <span>${name}</span>
        <button class="arrow-button">→</button>
      `;
      patientListEl.appendChild(li);
    });
}

// Evento para buscar pacientes
searchInput.addEventListener("input", e => {
  renderPatients(e.target.value);
});

// Evento para agregar paciente
addForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = newPatientInput.value.trim();
  if (name && !patients.includes(name)) {
    patients.push(name);
    localStorage.setItem("patients", JSON.stringify(patients));
    renderPatients(searchInput.value);
    newPatientInput.value = "";
  }
});

// Modo oscuro persistente
function loadTheme() {
  const dark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark-mode", dark);
  themeToggle.textContent = dark ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// Inicializar
renderPatients();
loadTheme();
