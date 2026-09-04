const switchButton = document.getElementById('switch-button');
const daySection = document.getElementById('day-section');
const nightSection = document.getElementById('night-section');
// Day section 
const pomodoro = document.getElementById('Pomodoro');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
// Night section 
const lofiButton = document.getElementById('lofi-sounds');
const lofiAudio = document.getElementById('lofi-audio');

switchButton.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
});