let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    renderLaps();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function lapTimer() {
    if (running) {
        laps.push(elapsedTime);
        renderLaps();
    }
}

function renderLaps() {
    lapList.innerHTML = '';
    laps.forEach((lap, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${idx + 1}</span><span>${formatTime(lap)}</span>`;
        lapList.appendChild(li);
    });
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

updateDisplay();
