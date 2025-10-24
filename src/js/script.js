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

// Exibe o tempo total assim que o áudio for carregado
audio.addEventListener('loadedmetadata', () => {
  if (audio.duration) {
    timeDisplay.textContent = `${formatTime(0)}/${formatTime(audio.duration)}`;
  }
});

// Atualiza barra e tempo conforme o áudio toca
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;

    // Exibe o tempo decorrido / total
    timeDisplay.textContent = `${formatTime(audio.currentTime)}/${formatTime(audio.duration)}`;
  }
});

// Permitir que o usuário avance ou retroceda o áudio
progressBar.addEventListener('input', () => {
  if (audio.duration) {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// Controle de volume
volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
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
    lastVolume = audio.volume;
    audio.muted = true;
    volumeIcon.textContent = '🔇';
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    audio.volume = lastVolume;
    volumeBar.value = lastVolume * 100;
    volumeIcon.textContent = lastVolume < 0.5 ? '🔉' : '🔊';
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