const switchButton = document.getElementById('switch-button');
const daySection = document.getElementById('day-section');
const nightSection = document.getElementById('night-section');
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

switchButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
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
  })
  li.appendChild(completeButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "✕";
  deleteButton.addEventListener('click', () => {
    li.remove();
  })
  li.appendChild(deleteButton);
  todoList.appendChild(li);
  todoInput.value = '';
});