let targetHour = 22;
let targetMinute = 0;
let countdownInterval = null;
let isRunning = false;
let totalDuration = 0;
let endTime = null;

const timeInput = document.getElementById('target-time');
const startStopBtn = document.getElementById('startStopBtn');
const title = document.getElementById('main-title');
const progressBar = document.getElementById('progress-bar');

function updateCountdown() {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    isRunning = false;

    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    progressBar.style.width = '100%';

    startStopBtn.textContent = 'Start';
    timeInput.style.display = 'inline-block';
    title.classList.remove('hidden');

    // 📳 Vibrate if supported
    if ("vibrate" in navigator) {
      navigator.vibrate([500, 200, 500]);
    }

    // 🛎️ Alert
    alert("⏰ Time's up!");
    return;
  }

  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;

  const elapsed = totalDuration - diff;
  const progress = Math.min((elapsed / totalDuration) * 100, 100);
  progressBar.style.width = `${progress}%`;
}

startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    const [hour, minute] = timeInput.value.split(':');
    targetHour = parseInt(hour);
    targetMinute = parseInt(minute);

    const now = new Date();
    endTime = new Date();
    endTime.setHours(targetHour, targetMinute, 0, 0);

    if (endTime <= now) {
      alert("Selected time already passed today!");
      return;
    }

    totalDuration = endTime - now;

    timeInput.style.display = 'none';
    startStopBtn.textContent = 'Stop';
    title.classList.add('hidden');

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    isRunning = true;
  } else {
    clearInterval(countdownInterval);
    isRunning = false;

    timeInput.style.display = 'inline-block';
    startStopBtn.textContent = 'Start';
    title.classList.remove('hidden');
    progressBar.style.width = '0%';
  }
});

// Fullscreen button support
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const docElm = document.documentElement;
  if (!document.fullscreenElement && docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

// Start with Enter key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isRunning) {
    startStopBtn.click();
  }
});
