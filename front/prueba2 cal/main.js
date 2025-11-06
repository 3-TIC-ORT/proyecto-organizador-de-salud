connect2Server();




const weekdaysShort = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const monthNames = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let viewDate = new Date();
let events = JSON.parse(localStorage.getItem("eventos")) || {}; // Guarda eventos en localStorage

// -------------------------------
// 🔧 Funciones de manejo de fechas
// -------------------------------
function pad(n) {
  return String(n).padStart(2, '0');
}
function makeKeyFromParts(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}
function makeKeyFromDate(dateObj) {
  return makeKeyFromParts(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
}
function normalizeStoredEvents(raw) {
  const normalized = {};
  for (const key in raw) {
    if (!raw.hasOwnProperty(key)) continue;
    const parts = key.split('-').map(p => p.replace(/^0+/, ''));
    if (parts.length === 3) {
      const y = Number(parts[0]);
      const m = Number(parts[1]) - 1;
      const d = Number(parts[2]);
      if (!Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) {
        const newKey = makeKeyFromParts(y, m, d);
        normalized[newKey] = Array.isArray(normalized[newKey])
          ? normalized[newKey].concat(raw[key])
          : (Array.isArray(raw[key]) ? raw[key].slice() : []);
      } else {
        normalized[key] = raw[key];
      }
    } else {
      normalized[key] = raw[key];
    }
  }
  return normalized;
}
// Normalizar al cargar
(function loadAndNormalizeEvents() {
  const raw = JSON.parse(localStorage.getItem("eventos") || "{}");
  const normalized = normalizeStoredEvents(raw);
  localStorage.setItem("eventos", JSON.stringify(normalized));
  events = normalized;
})();

// -------------------------------
// 🗓️ Construcción del calendario
// -------------------------------
function buildWeekdays() {
  const wk = document.getElementById('weekdays');
  wk.innerHTML = weekdaysShort.map(d => `<div>${d}</div>`).join('');
}

function render() {
  events = JSON.parse(localStorage.getItem("eventos")) || {};

  const daysEl = document.getElementById('days');
  const monthYearEl = document.getElementById('monthYear');
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  monthYearEl.textContent = monthNames[month + 1] + ' ' + year;

  const firstDay = new Date(year, month, 1).getDay();
  const shift = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let html = '';

  for (let i = 0; i < shift; i++) html += `<div class="day empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      new Date().getFullYear() === year &&
      new Date().getMonth() === month &&
      new Date().getDate() === d;

    const dateKey = makeKeyFromParts(year, month, d);
    const hasEvent = events[dateKey] && events[dateKey].length > 0;

    html += `
      <div class="day number ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}"
           data-date="${dateKey}">
        ${d}
      </div>`;
  }

  daysEl.innerHTML = html;
  document.querySelectorAll('.day.number').forEach(day => {
    day.addEventListener('click', openModal);
  });
}

// -------------------------------
// 🗒️ Modal de eventos
// -------------------------------
function openModal(e) {
  const date = e.target.dataset.date;
  const modal = document.getElementById('eventModal');
  const title = document.getElementById('modalTitle');
  const list = document.getElementById('eventList');
  title.textContent = `Eventos del ${date}`;
  list.innerHTML = '';

  if (events[date]) {
    events[date].forEach((ev, idx) => {
      const li = document.createElement('li');
      li.textContent = ev + ' ';
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.style.marginLeft = '8px';
      delBtn.onclick = () => {
        // eliminar evento
        events[date].splice(idx, 1);
        if (events[date].length === 0) delete events[date];
        localStorage.setItem("eventos", JSON.stringify(events));
        render();
        openModal({ target: { dataset: { date } } });
      };
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  modal.style.display = 'flex';
  document.getElementById('saveEvent').onclick = () => saveEvent(date);
  document.getElementById('closeModal').onclick = closeModal;
  document.getElementById('closeModalX').onclick = closeModal;
}

function closeModal() {
  const modal = document.getElementById('eventModal');
  modal.style.display = 'none';
  document.getElementById('eventText').value = '';
}

// -------------------------------
// 💾 Guardar evento
// -------------------------------
function saveEvent(date) {
  const text = document.getElementById('eventText').value.trim();
  if (text === '') return;

  const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || {};
  if (!eventosGuardados[date]) eventosGuardados[date] = [];
  eventosGuardados[date].push(text);
  localStorage.setItem("eventos", JSON.stringify(eventosGuardados));
  events = eventosGuardados;

  const idusuario = localStorage.getItem("idusuario");
  // Suponiendo que tenés el nombre del usuario en la variable "usuario"
  postEvent("calendario", { idusuario, date, text });

  document.getElementById('eventText').value = '';
  render();
  openModal({ target: { dataset: { date } } });
}


// -------------------------------
// 🔄 Navegación de meses
// -------------------------------
document.getElementById('prev').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  render();
});

document.getElementById('next').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  render();
});

buildWeekdays();
render();
