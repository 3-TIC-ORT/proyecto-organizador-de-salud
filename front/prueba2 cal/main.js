connect2Server();

const weekdaysShort = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const monthNames = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
let viewDate = new Date();
let events = JSON.parse(localStorage.getItem("eventos")) || {}; // Guarda eventos en localStorage

function buildWeekdays() {
  const wk = document.getElementById('weekdays');
  wk.innerHTML = weekdaysShort.map(d=>`<div>${d}</div>`).join('');
}

function render() {
  // 🔥 Recargar siempre los eventos más recientes
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

    // 🔧 Usar el mismo formato de clave que en localStorage
    const dateKey = `${year}-${month + 1}-${d}`; // sin ceros a la izquierda

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
        // eliminar evento según su índice
        events[date].splice(idx, 1);
      
        // si no quedan más eventos, borra la fecha del objeto
        if (events[date].length === 0) delete events[date];
      
        // guardar todo el objeto actualizado (manteniendo los demás eventos)
        localStorage.setItem("eventos", JSON.stringify(events));
      
        // refrescar vista
        render();
        openModal({ target: { dataset: { date } } });
      
        console.log(`Evento eliminado de ${date}`);
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
  document.getElementById('eventText').value = ''; // limpia el campo de texto
}


function saveEvent(date) {
  const text = document.getElementById('eventText').value.trim();
  if (text === '') return;

  // Cargar SIEMPRE los eventos más recientes desde localStorage
  let eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || {};

  // Si no hay eventos para esa fecha, crear el array
  if (!eventosGuardados[date]) eventosGuardados[date] = [];

  // Agregar el nuevo evento
  eventosGuardados[date].push(text);

  // Guardar de nuevo todo el objeto completo
  localStorage.setItem("eventos", JSON.stringify(eventosGuardados));

  // Actualizar la variable global (para que el render use los datos nuevos)
  events = eventosGuardados;

  // Refrescar la vista
  document.getElementById('eventText').value = '';
  render();
  openModal({ target: { dataset: { date } } });

  console.log(`Evento guardado para ${date}: ${text}`);
}







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
