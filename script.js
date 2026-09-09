/* DOM elements */
const switchButton = document.getElementById('switch-button');
const daySection = document.getElementById('day-section');
const nightSection = document.getElementById('night-section');
const greeting = document.getElementById('greeting');
// Day section 
const studyButton = document.getElementById('study-button');
const todoButton = document.getElementById('todo-button');
const notesButton = document.getElementById('notes-button');
// Study view
const studyView = document.getElementById('study-view');
const pomodoro = document.getElementById('Pomodoro');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

// Todo view 
const todoView = document.getElementById('todo-view');
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo-button');
const todoList = document.getElementById('todo-list');
// Notes view
const notesView = document.getElementById('notes-view');
const notesSection = document.getElementById('notes');
// Game button
const gameButton = document.getElementById('prank-button');
const flash = document.getElementById('flashbang');
const jobApp = document.getElementById('job-app')
const prankAudio = document.getElementById('unexpected-audio');
// Night section 
const lofiButton = document.getElementById('lofi-sounds');
const lofiAudio = document.getElementById('lofi-audio');
// Time and date
let currentTime = document.getElementById('clock-time');
let currentDate = document.getElementById('clock-date');
// Stars
const starField = document.querySelector('.star');

/* States and variables */
// Timer
let startingTime = 1500;
let totalSeconds = startingTime;
let breakTime = 300;
let isWorkMode = true;
let timerInterval = null;

/* Helper Functions */
function updateDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let formattedMin = String(minutes).padStart(2, '0');
  let formattedSec = String(seconds).padStart(2, '0');

  pomodoro.textContent = formattedMin + ":" + formattedSec;
}

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let formattedHours = String(hours).padStart(2, '0');
  let formattedMins = String(minutes).padStart(2, '0');
  currentTime.textContent = formattedHours + ":" + formattedMins;
  let formattedDate = now.toLocaleDateString('en-AU', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
  currentDate.textContent = formattedDate;
}

// Function to randomly generate stars
function generateStars () {
  let stars = "";
  for (let i = 0; i < 50; i++) {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    stars += `${x}px ${y}px #fff, `;
  }
  starField.style.boxShadow = stars.slice(0, -2);
}

// Persistence for todo list
function saveTasks() {
  const tasks = [];
  const items = document.querySelectorAll('li');

  for (const item of items) {
    tasks.push(item.firstChild.textContent);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  if (taskList === null) {
    return;
  }
  for (const task of taskList) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);
    const completeButton = document.createElement('button');
    completeButton.textContent = "✓";
    completeButton.classList.add('item-button');
    completeButton.addEventListener('click', () => {
      span.classList.toggle('completed');
      saveTasks();
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "✕";
    deleteButton.classList.add('item-button');
    deleteButton.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
}

/* Event Listeners */
switchButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    let themeName;
    if (document.body.classList.contains('night-mode')) {
        greeting.textContent = 'Time to rest and reset 😴';
        themeName = 'night-mode';
    } else {
        greeting.textContent = 'Lock In Time?';
        themeName = 'day-mode';
    }
    localStorage.setItem('theme', themeName)
});

studyButton.addEventListener('click', () => {
  studyView.style.display = 'block';
  todoView.style.display = 'none';
  notesView.style.display = 'none';
});

todoButton.addEventListener('click', () => {
  studyView.style.display = 'none';
  todoView.style.display = 'block';
  notesView.style.display = 'none';
});

notesButton.addEventListener('click', () => {
  studyView.style.display = 'none';
  todoView.style.display = 'none';
  notesView.style.display = 'block';
});


startButton.addEventListener('click', () => {
  if (timerInterval !== null) {
    return;
  }
  
  timerInterval = setInterval(() => {
    totalSeconds--;
    updateDisplay();
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isWorkMode = !isWorkMode;
      if (isWorkMode === true) {
        totalSeconds = startingTime;
      } else {
        totalSeconds = breakTime;
      }
      updateDisplay();
    }
  }, 1000);
});

pauseButton.addEventListener('click', () => {
  if (timerInterval === null) {
    return;
  }
  
  clearInterval(timerInterval);
  timerInterval = null;
});

resetButton.addEventListener('click', () => {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (isWorkMode === true) {
    totalSeconds = startingTime;
  } else {
    totalSeconds = breakTime;
  }
  updateDisplay();
});

addTodoButton.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    return;
  }
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;
  li.appendChild(span);

  const completeButton = document.createElement('button');
  completeButton.textContent = "✓";
  completeButton.classList.add('item-button');
  completeButton.addEventListener('click', () => {
    span.classList.toggle('completed')
    saveTasks();
  })
  li.appendChild(completeButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "✕";
  deleteButton.classList.add('item-button');
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveTasks();
  })
  li.appendChild(deleteButton);
  todoList.appendChild(li);
  todoInput.value = '';
  saveTasks();
});

gameButton.addEventListener('click', () => {
  gameButton.disabled = true;
  flash.classList.add('active');
  setTimeout(() => {
    flash.classList.remove('active');
    jobApp.classList.add('active');
    setTimeout(() => {
      jobApp.classList.remove('active');
    }, 15000);
  }, 1500);
  prankAudio.currentTime = 0;
  prankAudio.play();
  setTimeout(() => {
    prankAudio.pause();
    gameButton.disabled = false;
  }, 16500)
})

// Music player
lofiButton.addEventListener('click', () => {
  if (lofiAudio.paused === true) {
    lofiAudio.play();
    lofiButton.textContent = 'Pause Lofi Music';
  } else {
    lofiAudio.pause();
    lofiButton.textContent = 'Play Lofi Music';
  }
})

notesSection.addEventListener('input', () => {
  localStorage.setItem('notes', notesSection.value);
});

/* Initiations */
// Load theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
}

if (document.body.classList.contains('night-mode')) {
  greeting.textContent = 'Time to rest and reset 😴';
} else {
  greeting.textContent = 'Lock In Time?';
}

// Load data and UI
notesSection.value = localStorage.getItem('notes') || '';
loadTasks();
generateStars();
updateClock();
setInterval(updateClock, 1000);
