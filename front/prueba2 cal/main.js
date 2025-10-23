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
  const daysEl = document.getElementById('days');
  const monthYearEl = document.getElementById('monthYear');
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  monthYearEl.textContent = monthNames[month+1] + ' ' + year;

  const firstDay = new Date(year, month, 1).getDay();
  const shift = (firstDay + 6) % 7; 
  const daysInMonth = new Date(year, month+1, 0).getDate();
  let html = '';

  for (let i=0;i<shift;i++) html += `<div class="day empty"></div>`;

  for (let d=1; d<=daysInMonth; d++) {
    const isToday = (new Date().getFullYear()===year && new Date().getMonth()===month && new Date().getDate()===d);
    const dateKey = `${year}-${month+1}-${d}`;
    const hasEvent = events[dateKey];
    html += `<div class="day number ${isToday? 'today':''} ${hasEvent? 'has-event':''}" data-date="${dateKey}">${d}</div>`;
  }

  daysEl.innerHTML = html;

  document.querySelectorAll('.day.number').forEach(day => {
    day.addEventListener('click', openModal);
  });
}

function openModal(e) {
  document.getElementById('closeModalX').onclick = () => modal.style.display = 'none';

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
        // guardar cambios en localStorage
        localStorage.setItem("eventos", JSON.stringify(events));
        // volver a renderizar todo y actualizar modal
        render();
        openModal({ target: { dataset: { date } } });
      };
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  modal.style.display = 'flex';
  document.getElementById('saveEvent').onclick = () => saveEvent(date);
  document.getElementById('closeModal').onclick = () => modal.style.display = 'none';
}

function saveEvent(date) {
  const text = document.getElementById('eventText').value.trim();
  if (text === '') return;
  if (!events[date]) events[date] = [];
  events[date].push(text);
  localStorage["eventos"]= JSON.stringify(events);
  postEvent("calendario", JSON.stringify(events));
  document.getElementById('eventText').value = '';
  render(); // refresca el calendario
  openModal({target: {dataset: {date}}});
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
