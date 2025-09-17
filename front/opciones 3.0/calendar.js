// calendar-strip.js

document.addEventListener("DOMContentLoaded", function () {
    const monthDisplay = document.getElementById("calendarStripMonth");
    const daysContainer = document.getElementById("calendarStripDays");
    const prevBtn = document.getElementById("prevMonthBtn");
    const nextBtn = document.getElementById("nextMonthBtn");
  
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDay = null;
  
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    function renderCalendarStrip(month, year) {
      daysContainer.innerHTML = "";
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      monthDisplay.textContent = `${monthNames[month]} ${year}`;
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dayBox = document.createElement("div");
        dayBox.className = "day-box";
        dayBox.innerHTML = `<div>${day}</div><div>${getWeekDay(year, month, day)}</div>`;
  
        // Hoy
        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          dayBox.classList.add("today");
        }
  
        // Selección
        if (
          selectedDay &&
          day === selectedDay.day &&
          month === selectedDay.month &&
          year === selectedDay.year
        ) {
          dayBox.classList.add("selected");
        }
  
        // Evento click
        dayBox.addEventListener("click", () => {
          selectedDay = { day, month, year };
          renderCalendarStrip(month, year);
        });
  
        daysContainer.appendChild(dayBox);
      }
    }
  
    function getWeekDay(year, month, day) {
      const date = new Date(year, month, day);
      return ["D", "L", "M", "M", "J", "V", "S"][date.getDay()];
    }
  
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendarStrip(currentMonth, currentYear);
    });
  
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendarStrip(currentMonth, currentYear);
    });
  
    renderCalendarStrip(currentMonth, currentYear);
  });
  