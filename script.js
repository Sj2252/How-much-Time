let targetHour = 22;
let targetMinute = 0;
let countdownInterval = null;
let vibrationInterval = null;
let isRunning = false;
let totalDuration = 0;
let endTime = null;
let wakeLock = null;

const timeInput = document.getElementById('target-time');
const startStopBtn = document.getElementById('startStopBtn');
const title = document.getElementById('main-title');

// Progress bar removed

function updateCountdown() {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    isRunning = false;

    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';

    startStopBtn.textContent = 'Start';
    timeInput.style.display = 'inline-block';
    title.classList.remove('hidden');

    const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    if ("vibrate" in navigator) {
      vibrationInterval = setInterval(() => {
        navigator.vibrate([300, 150, 300]);
      }, 1000);
    }

    setTimeout(() => {
      alert("⏰ Time's up!");
      if (vibrationInterval) clearInterval(vibrationInterval);
      navigator.vibrate(0);
    }, 1500);

    return;
  }

  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
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
    if (vibrationInterval) clearInterval(vibrationInterval);
    navigator.vibrate(0);

    isRunning = false;
    timeInput.style.display = 'inline-block';
    startStopBtn.textContent = 'Start';
    title.classList.remove('hidden');
  }
});

document.getElementById('fullscreenBtn').addEventListener('click', () => {
  const docElm = document.documentElement;
  if (!document.fullscreenElement && docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isRunning) {
    startStopBtn.click();
  }
});

// Wake Lock to keep screen on
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock released');
    });
    console.log('Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

document.addEventListener('visibilitychange', () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    requestWakeLock();
  }
});

requestWakeLock();
