let currentDate = dayjs();
let daysInMonth = dayjs().daysInMonth();
let firstDayPosition = dayjs().startOf("month").day();
let monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let dateElement = document.querySelector("#calendar .calendar-dates");
let calendarTitle = document.querySelector(".calendar-title-text");
let nextMonthButton = document.querySelector("#nextMonth");
let prevMonthButton = document.querySelector("#prevMonth");
let dayNamesElement = document.querySelector(".calendar-day-name");
let todayButton = document.querySelector("#today");
let dateItems = null;
let newMonth = null;

// Define the timetable data
const schedule = {
  'Monday': [
    { name: 'Principles of Software Engineering and Principles', startTime: '08:00 AM', endTime: '08:50 AM' },
    { name: 'Principles of Operating System', startTime: '08:50 AM', endTime: '09:40 AM' },
    { name: 'Break', startTime: '09:40 AM', endTime: '10:05 AM' },
    { name: 'Artificial Inelligence', startTime: '10:05 aM', endTime: '10:55 AM' },
    { name: 'Data Analytics and Visualization', startTime: '10:55 AM', endTime: '11:45 AM' },
    { name: 'Lunch', startTime: '11:45 AM', endTime: '12:35 PM' },
    { name: 'OS Lab', startTime: '12:35 PM', endTime: '03:40 PM' }
  ],
  'Tuesday': [
    { name: 'Period 1', startTime: '09:00 AM', endTime: '10:00 AM' },
    { name: 'Period 2', startTime: '10:15 AM', endTime: '11:15 AM' },
    { name: 'Lunch', startTime: '12:00 PM', endTime: '01:00 PM' },
    { name: 'Period 3', startTime: '01:15 PM', endTime: '02:15 PM' },
    { name: 'Period 4', startTime: '02:30 PM', endTime: '03:30 PM' },
    { name: 'Study Hall', startTime: '03:45 PM', endTime: '04:30 PM' },
    { name: 'Sports Practice', startTime: '04:45 PM', endTime: '06:00 PM' }
  ],
  'Wednesday': [
    { name: 'Period 1', startTime: '09:00 AM', endTime: '10:00 AM' },
    { name: 'Period 2', startTime: '10:15 AM', endTime: '11:15 AM' },
    { name: 'Lunch', startTime: '12:00 PM', endTime: '01:00 PM' },
    { name: 'Period 3', startTime: '01:15 PM', endTime: '02:15 PM' },
    { name: 'Club Meeting', startTime: '02:30 PM', endTime: '03:30 PM' },
    { name: 'Study Hall', startTime: '03:45 PM', endTime: '04:30 PM' },
    { name: 'Music Lessons', startTime: '04:45 PM', endTime: '06:00 PM' }
  ],
  'Thursday': [
    { name: 'Period 1', startTime: '09:00 AM', endTime: '10:00 AM' },
    { name: 'Period 2', startTime: '10:15 AM', endTime: '11:15 AM' },
    { name: 'Lunch', startTime: '12:00 PM', endTime: '01:00 PM' },
    { name: 'Period 3', startTime: '01:15 PM', endTime: '02:15 PM' },
    { name: 'Period 4', startTime: '02:30 PM', endTime: '03:30 PM' },
    { name: 'Study Hall', startTime: '03:45 PM', endTime: '04:30 PM' },
    { name: 'Volunteering', startTime: '04:45 PM', endTime: '06:00 PM' }
  ],
  'Friday': [
    { name: 'Period 1', startTime: '09:00 AM', endTime: '10:00 AM' },
    { name: 'Period 2', startTime: '10:15 AM', endTime: '11:15 AM' },
    { name: 'Lunch', startTime: '12:00 PM', endTime: '01:00 PM' },
    { name: 'Period 3', startTime: '01:15 PM', endTime: '02:15 PM' },
    { name: 'Period 4', startTime: '02:30 PM', endTime: '03:30 PM' },
    { name: 'Study Hall', startTime: '03:45 PM', endTime: '04:30 PM' },
    { name: 'Movie Night', startTime: '06:00 PM', endTime: '09:00 PM' }
  ],
  'Saturday': [
    { name: 'Movie Night', startTime: '08:50 PM', endTime: '10:50 PM' }
  ],
  'Sunday': [
  ]
};


weekNames.forEach(function (item) {
  dayNamesElement.innerHTML += `<div>${item}</div>`;
});

function plotDays() {
  let count = 1;
  dateElement.innerHTML = "";

  let prevMonthLastDate = currentDate.subtract(1, "month").endOf("month").$D;
  let prevMonthDateArray = [];

  //plot prev month array
  for (let p = 1; p < firstDayPosition; p++) {
    prevMonthDateArray.push(prevMonthLastDate--);
  }
  prevMonthDateArray.reverse().forEach(function (day) {
    dateElement.innerHTML += `<button class="calendar-dates-day-empty">${day}</button>`;
  });

  //plot current month dates
  for (let i = 0; i < daysInMonth; i++) {
    dateElement.innerHTML += `<button class="calendar-dates-day">${count++}</button>`;
  }

  //next month dates
  let diff =
    42 - Number(document.querySelector(".calendar-dates").children.length);
  let nextMonthDates = 1;
  for (let d = 0; d < diff; d++) {
    document.querySelector(
      ".calendar-dates"
    ).innerHTML += `<button class="calendar-dates-day-empty">${nextMonthDates++}</button>`;
  }

  //month name and year
  calendarTitle.innerHTML = `${
    monthNames[currentDate.month()]
  } - ${currentDate.year()}`;
}

//highlight current date
function highlightCurrentDate() {
  dateItems = document.querySelectorAll(".calendar-dates-day");
  if (dateElement && dateItems[currentDate.$D - 1]) {
    dateItems[currentDate.$D - 1].classList.add("today-date");
  }
}

//next month button event
nextMonthButton.addEventListener("click", function () {
  newMonth = currentDate.add(1, "month").startOf("month");
  setSelectedMonth();
});

//prev month button event
prevMonthButton.addEventListener("click", function () {
  newMonth = currentDate.subtract(1, "month").startOf("month");
  setSelectedMonth();
});

//today button event
todayButton.addEventListener("click", function () {
  newMonth = dayjs();
  setSelectedMonth();
  setTimeout(function () {
    highlightCurrentDate();
  }, 50);
});

//set next and prev month
function setSelectedMonth() {
  daysInMonth = newMonth.daysInMonth();
  firstDayPosition = newMonth.startOf("month").day();
  currentDate = newMonth;
  plotDays();
}

//init
plotDays();
setTimeout(function () {
  highlightCurrentDate();
}, 50);

function getCurrentPeriod(schedule) {
  const now = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];

  if (schedule[dayOfWeek]) {
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (const period of schedule[dayOfWeek]) {
      const startTime = parseTime(period.startTime);
      const endTime = parseTime(period.endTime);

      if (currentTime >= startTime && currentTime < endTime) {
        return period.name;
      }
    }
  }

  return 'No current period';
}

function parseTime(timeString) {
  const [hours, minutes] = timeString.split(/[ :]/);
  const isPM = timeString.toLowerCase().includes('pm');
  return (parseInt(hours) + (isPM && hours !== '12' ? 12 : 0)) * 60 + parseInt(minutes);
}

// Get the current period
function updateCurrentPeriodDisplay() {
  const currentPeriod = getCurrentPeriod(schedule);
  document.getElementById('cperiod').textContent = 'Now: ' + currentPeriod;
}


updateCurrentPeriodDisplay();

// Call the function every minute (60,000 milliseconds)
setInterval(updateCurrentPeriodDisplay, 60000);







