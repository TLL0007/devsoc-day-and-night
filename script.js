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