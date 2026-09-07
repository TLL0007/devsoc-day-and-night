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
// Night section 
const lofiButton = document.getElementById('lofi-sounds');
const lofiAudio = document.getElementById('lofi-audio');

// Timer
let startingTime = 1500;
let totalSeconds = startingTime;
let breakTime = 300;
let isWorkMode = true;
let timerInterval = null;

// Time and date
let currentTime = document.getElementById('clock-time');
let currentDate = document.getElementById('clock-date');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
}
if (document.body.classList.contains('night-mode')) {
  greeting.textContent = 'Time to rest and reset 😴';
} else {
  greeting.textContent = 'Lock In Time?';
}

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

function updateDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let formattedMin = String(minutes).padStart(2, '0');
  let formattedSec = String(seconds).padStart(2, '0');

  pomodoro.textContent = formattedMin + ":" + formattedSec;
}

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
  li.textContent= taskText;

  const completeButton = document.createElement('button');
  completeButton.textContent = "✓";
  completeButton.addEventListener('click', () => {
    li.classList.toggle('completed')
    saveTasks();
  })
  li.appendChild(completeButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "✕";
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveTasks();
  })
  li.appendChild(deleteButton);
  todoList.appendChild(li);
  todoInput.value = '';
  saveTasks();
});

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

updateClock();
setInterval(updateClock, 1000);

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
  for (const task of taskList) {
    const li = document.createElement('li');
    li.textContent= task;
    const completeButton = document.createElement('button');
    completeButton.textContent = "✓";
    completeButton.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "✕";
    deleteButton.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
}

loadTasks();


// Persistence for notes
notesSection.value = localStorage.getItem('notes')

notesSection.addEventListener('input', () => {
  localStorage.setItem('notes', notesSection.value);
});