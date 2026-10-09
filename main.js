
const heartsContainer = document.getElementById('hearts');
const song = document.getElementById('loveSong');
const musicButton = document.getElementById('musicButton');

const heartSymbols = ['♡', '♥', 'ღ', '୨୧', '❤'];

function createHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement('span');
  heart.className = 'heart';

  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (12 + Math.random() * 24) + 'px';
  heart.style.animationDuration = (7 + Math.random() * 6) + 's';

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 14000);
}

// Create some hearts immediately
if (heartsContainer) {
  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 180);
  }

  // Keep hearts floating continuously
  setInterval(createHeart, 400);
}

// Music controls
if (song && musicButton) {
  function updateMusicButton() {
    musicButton.textContent = song.paused
      ? '♫ play our song ♡'
      : '♫ pause our song ♡';
  }

  musicButton.addEventListener('click', async () => {
    if (song.paused) {
      try {
        await song.play();
      } catch (error) {
        console.log('Please check the music file and try again.');
      }
    } else {
      song.pause();
    }

    updateMusicButton();
  });

  song.addEventListener('play', updateMusicButton);
  song.addEventListener('pause', updateMusicButton);

  // Attempt autoplay; browsers may require user interaction
  song.play().catch(() => {
    updateMusicButton();
  });
}
