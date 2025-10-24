const audio = document.getElementById('podcast-audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const volumeIcon = document.getElementById('volume-icon');
const timeDisplay = document.getElementById('time-display');

let lastVolume = 1;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// Atualiza barra e tempo
audio.addEventListener('timeupdate', () => {
  const remaining = audio.duration - audio.currentTime;
  if (!isNaN(remaining)) {
    timeDisplay.textContent = `▶️${formatTime(remaining)}`;
  }
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Atualiza volume conforme o slider
volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;

  // Troca o ícone de acordo com o volume
  if (audio.volume === 0) {
    volumeIcon.textContent = '🔇';
  } else if (audio.volume < 0.5) {
    volumeIcon.textContent = '🔉';
  } else {
    volumeIcon.textContent = '🔊';
  }
});

// Clique no ícone → mute/unmute
volumeIcon.addEventListener('click', () => {
  if (!audio.muted) {
    // Muta o áudio
    lastVolume = audio.volume;
    audio.muted = true;
    volumeIcon.textContent = '🔇'; // muda o ícone
    volumeBar.value = 0;
  } else {
    // Desmuta o áudio
    audio.muted = false;
    audio.volume = lastVolume;
    volumeBar.value = lastVolume * 100;

    // Define o ícone com base no volume anterior
    if (lastVolume < 0.5) {
      volumeIcon.textContent = '🔉';
    } else {
      volumeIcon.textContent = '🔊';
    }
  }
});

// Botão play/pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});
