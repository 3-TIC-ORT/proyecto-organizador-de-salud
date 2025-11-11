connect2Server();

const weekdaysShort = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const monthNames = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let viewDate = new Date();
let events = {}; // Cargados desde el backend

// ---------- Funciones de ayuda ----------
function pad(n) { return String(n).padStart(2, '0'); }
function makeKeyFromParts(year, monthIndex, day) { return `${year}-${pad(monthIndex + 1)}-${pad(day)}`; }
function makeKeyFromDate(dateObj) { return makeKeyFromParts(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()); }

// ---------- Dibuja los días de la semana ----------
function buildWeekdays() {
  const wk = document.getElementById('weekdays');
  wk.innerHTML = weekdaysShort.map(d => `<div>${d}</div>`).join('');
}

// ---------- Renderizar el calendario ----------
function render() {
  const mail = localStorage.getItem("mail");
  postEvent("cargarEventos", { mail }, (res) => {
    events = res || {};
    drawCalendar();
  });
}

function drawCalendar() {
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
    const dateKey = makeKeyFromParts(year, month, d);
    const hasEvent = events[dateKey] && events[dateKey].length > 0;
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

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

// ---------- Modal ----------
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
      li.textContent = ev;
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.onclick = () => deleteEvent(date, idx);
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
  document.getElementById('eventModal').style.display = 'none';
  document.getElementById('eventText').value = '';
}

// ---------- Guardar y eliminar eventos ----------
function saveEvent(date) {
  const text = document.getElementById('eventText').value.trim();
  if (!text) return;
  const mail = localStorage.getItem("mail");

  postEvent("calendario", { mail, fecha: date, texto: text }, (res) => {
    if (res.msg) {
      if (!events[date]) events[date] = [];
      events[date].push(text);
      drawCalendar();
      openModal({ target: { dataset: { date } } });
    }
  });
}

function deleteEvent(date, idx) {
  events[date].splice(idx, 1);
  if (events[date].length === 0) delete events[date];
  drawCalendar();
  openModal({ target: { dataset: { date } } });
}

// ---------- Navegación ----------
document.getElementById('prev').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  drawCalendar();
});
document.getElementById('next').addEventListener('click', () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  drawCalendar();
});

// Inicialización
buildWeekdays();
render();
