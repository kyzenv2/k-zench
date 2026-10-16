// ==========================================
// LOGIKA UNTUK FLOATING PLAYER (TAYLOR SWIFT)
// ==========================================
const taylorPlayerDock = document.getElementById('taylor-player-dock');
const taylorAudio = document.getElementById('taylor-audio');
const taylorProgressBar = document.getElementById('taylor-progress-bar');
const taylorCurrentTime = document.getElementById('taylor-current-time');
const taylorDuration = document.getElementById('taylor-duration');
const taylorPlayPauseIcon = document.getElementById('taylor-play-pause-icon');

// Fungsi untuk memunculkan/menyembunyikan player
function toggleTaylorPlayer() {
  if (taylorPlayerDock.classList.contains('translate-y-[150%]')) {
    taylorPlayerDock.classList.remove('translate-y-[150%]', 'opacity-0', 'pointer-events-none');
    taylorPlayerDock.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
  } else {
    closeTaylorPlayer();
  }
}

// Fungsi khusus untuk menutup player (X button) - LANGSUNG STOP & SEMBUNYIKAN
function closeTaylorPlayer() {
  taylorAudio.pause();
  taylorAudio.currentTime = 0;
  taylorProgressBar.style.width = '0%';
  taylorCurrentTime.textContent = '0:00';

  taylorPlayPauseIcon.classList.remove('fa-pause');
  taylorPlayPauseIcon.classList.add('fa-play');
  taylorPlayPauseIcon.classList.add('ml-0.5');

  taylorPlayerDock.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
  taylorPlayerDock.classList.add('translate-y-[150%]', 'opacity-0', 'pointer-events-none');
}

// Fungsi Toggle Play/Pause
function toggleTaylorPlayPause() {
  if (taylorAudio.paused) {
    taylorAudio.play();
    taylorPlayPauseIcon.classList.remove('fa-play');
    taylorPlayPauseIcon.classList.add('fa-pause');
    taylorPlayPauseIcon.classList.remove('ml-0.5');
  } else {
    taylorAudio.pause();
    taylorPlayPauseIcon.classList.remove('fa-pause');
    taylorPlayPauseIcon.classList.add('fa-play');
    taylorPlayPauseIcon.classList.add('ml-0.5');
  }
}

// Fungsi Tombol Stop (Pause + kembali ke detik 0)
function stopTaylor() {
  taylorAudio.pause();
  taylorAudio.currentTime = 0;
  taylorProgressBar.style.width = '0%';
  taylorCurrentTime.textContent = '0:00';

  taylorPlayPauseIcon.classList.remove('fa-pause');
  taylorPlayPauseIcon.classList.add('fa-play');
  taylorPlayPauseIcon.classList.add('ml-0.5');
}

// Update progress bar secara otomatis
taylorAudio.addEventListener('timeupdate', () => {
  const progress = (taylorAudio.currentTime / taylorAudio.duration) * 100 || 0;
  taylorProgressBar.style.width = `${progress}%`;
  taylorCurrentTime.textContent = formatTime(taylorAudio.currentTime);
  taylorDuration.textContent = formatTime(taylorAudio.duration);
});

// Fungsi untuk menggeser posisi lagu (seek)
function seekTaylor(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percentage = offsetX / rect.width;
  taylorAudio.currentTime = percentage * taylorAudio.duration;
}

// Fungsi helper untuk format waktu
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// ==========================================
// LOGIKA UNTUK EFEK MENGETIK (TYPEWRITER)
// ==========================================
const textArray = [
  "Building beautiful digital experiences.",
  "Sharing knowledge about web technologies.",
  "Music Lover & Gamer."
];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter-text");
const typingSpeed = 50;
const erasingSpeed = 30;
const newTextDelay = 2000;

function typeWriter() {
  if (charIndex < textArray[textIndex].length) {
    typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else {
    setTimeout(eraseText, newTextDelay);
  }
}

function eraseText() {
  if (charIndex > 0) {
    typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, erasingSpeed);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeWriter, 500);
  }
}

// Mulai efek mengetik setelah halaman dimuat
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});