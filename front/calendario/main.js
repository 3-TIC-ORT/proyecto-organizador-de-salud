
const nombreMes = date.toLocaleString('es-AR', { month: 'long' });
monthYear.textContent = `${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} ${year}`;


// calculos de los días
const firstOfMonth = new Date(year, month, 1);
const lastOfMonth = new Date(year, month + 1, 0);
const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // convertir DOM(0)..SAB(6) a LUN(0)..DOM(6)
const daysInMonth = lastOfMonth.getDate();


// días del mes anterior visibles para completar la primera fila
const prevMonthLast = new Date(year, month, 0).getDate();
for (let i = 0; i < firstWeekday; i++) {
const d = prevMonthLast - firstWeekday + 1 + i;
const el = makeDayElement(d, true);
calendarGrid.appendChild(el);
}


// días del mes actual
for (let d = 1; d <= daysInMonth; d++) {
const el = makeDayElement(d, false, year, month);
calendarGrid.appendChild(el);
}


// completar con días del siguiente mes hasta terminar la cuadrícula (multiplo de 7)
while (calendarGrid.children.length % 7 !== 0) {
const nextDayNum = calendarGrid.children.length - 7 - daysInMonth - firstWeekday + 1;
const el = makeDayElement(nextDayNum, true);
calendarGrid.appendChild(el);
}



function makeDayElement(dayNumber, isDisabled, year, month) {
const el = document.createElement('div');
el.className = 'day' + (isDisabled ? ' disabled' : '');
const num = document.createElement('div');
num.className = 'num';
num.textContent = dayNumber;
el.appendChild(num);


// si no es disabled, añadimos interacción y comprobamos si es hoy
if (!isDisabled) {
const dt = new Date(year, month, dayNumber);
const today = new Date();
if (dt.toDateString() === today.toDateString()) el.classList.add('today');


el.addEventListener('click', () => {
selectedInfo.textContent = `Seleccionaste: ${dt.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
});
}


return el;
}


// controles
prevBtn.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); renderCalendar(current); });
nextBtn.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); renderCalendar(current); });
todayBtn.addEventListener('click', () => { current = new Date(); renderCalendar(current); selectedInfo.textContent = '' });


// inicializar
renderCalendar(current);