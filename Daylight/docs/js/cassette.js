window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const cassetteWrapper = document.getElementById("cassette-wrapper");

  setTimeout(() => {
    loadingScreen.classList.add("hide");
    setTimeout(() => {
      loadingScreen.style.display = "none";
      cassetteWrapper.style.display = "block";
    }, 1000);
  }, 3000);
});

const knob = document.getElementById("volumeKnob");
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const leftReel = document.getElementById("reel-left");
const rightReel = document.getElementById("reel-right");
const rewindButton = document.getElementById("rewindBtn");
const forwardButton = document.getElementById("forwardBtn");
const songTitle = document.getElementById("songTitle");
const progressBar = document.getElementById("progressBar");

const playlist = [
  "../audio/Daylight - Taylor Swift.mp3",
  "../audio/Ribs - Lorde.mp3",
  "../audio/There is a light that never goes out - The Smiths.mp3",
  "../audio/Are you bored yet - Wallows, CLairo.mp3",
  "../audio/Bags - CLairo.mp3",
  "../audio/Lovers Rock - TV girl.mp3",
  "../audio/My kind of woman - Mac DeMarco.mp3",
  "../audio/Champagne Coast - Blood Orange.mp3",
  "../audio/Lover, You Should've Come Over - Jeff Buckley.mp3",
  "../audio/Apocalypse - Cigarettes After Sex.mp3",
  "../audio/I'll Be - Edwin McCain.mp3",
  "../audio/No Other Heart - Mac DeMarco.mp3",
  "../audio/Yellow - Coldplay.mp3",
  "../audio/Invisible string - Taylor Swift.mp3",
  "../audio/Mystery of Love - Sufjan Stevens.mp3",
  "../audio/Hallelujah - Jeff Buckley.mp3",
  "../audio/Sunsetz - Cigarettes After Sex.mp3",
  "../audio/Old Money - Lana Del Rey.mp3",
  "../audio/Look After You - The Fray.mp3",
  "../audio/You and Me - Lifehouse.mp3",
  "../audio/California - Lana Del Rey.mp3",
  "../audio/K. - Cigarettes After Sex.mp3",
  "../audio/Back To The Old House - The Smiths.mp3",
  "../audio/Sweet - Cigarettes After Sex.mp3",
  "../audio/She Will Be Loved - Maroon 5.mp3",
  "../audio/Back To The Basics - Lana Del Rey.mp3",
  "../audio/Every Breath You Take - The Police.mp3",
  "../audio/Heaven knows I'm miserable now - The Smiths.mp3",
  "../audio/Your Universe - Rico Blanco.mp3",
  "../audio/Iris - Goo Goo Dolls.mp3",
];

let currentTrack = 0;
let isDragging = false;
let currentRotation = 0;

// Load first track
switchToTrack(currentTrack);

// Toggle play/pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play().then(() => {
      playPauseBtn.textContent = "⏸";
      leftReel.classList.add("spin");
      rightReel.classList.add("spin");
    }).catch(e => {
      console.warn("Autoplay blocked:", e);
      alert("Click ▶ to start the music.");
    });
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
    leftReel.classList.remove("spin");
    rightReel.classList.remove("spin");
  }
}

// Volume knob control
knob.addEventListener("mousedown", () => { isDragging = true; });
document.addEventListener("mouseup", () => { isDragging = false; });

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = knob.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  angle = (angle + 360) % 360;

  if (angle >= 0 && angle <= 270) {
    knob.style.transform = `rotate(${angle}deg)`;
    currentRotation = angle;
    audio.volume = angle / 270;
  }
});

// Auto play next track on end
audio.addEventListener("ended", () => {
  playNextTrack();
});

// Progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
  }
});

let rewindTimer, forwardTimer;
let rewindHeld = false;
let forwardHeld = false;
const holdThreshold = 400; // milliseconds

// === REWIND BUTTON ===
rewindButton.addEventListener("mousedown", () => {
  rewindHeld = false;
  rewindTimer = setTimeout(() => {
    rewindHeld = true;
    audio.currentTime = Math.max(audio.currentTime - 5, 0); // HOLD = rewind 5s
  }, holdThreshold);
});

rewindButton.addEventListener("mouseup", () => {
  clearTimeout(rewindTimer);
  if (!rewindHeld) {
    playPreviousTrack(); // TAP = previous track
  }
});

rewindButton.addEventListener("mouseleave", () => {
  clearTimeout(rewindTimer);
});


// === FORWARD BUTTON ===
forwardButton.addEventListener("mousedown", () => {
  forwardHeld = false;
  forwardTimer = setTimeout(() => {
    forwardHeld = true;
    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration); // HOLD = fast forward 5s
  }, holdThreshold);
});

forwardButton.addEventListener("mouseup", () => {
  clearTimeout(forwardTimer);
  if (!forwardHeld) {
    playNextTrack(); // TAP = next track
  }
});

forwardButton.addEventListener("mouseleave", () => {
  clearTimeout(forwardTimer);
});


// Play next/previous functions
function playPreviousTrack() {
  const newIndex = (currentTrack - 1 + playlist.length) % playlist.length;
  switchToTrack(newIndex);
}

function playNextTrack() {
  const newIndex = (currentTrack + 1) % playlist.length;
  switchToTrack(newIndex);
}

// Switch & play helper
function switchToTrack(index) {
  currentTrack = index;
  audio.src = playlist[currentTrack];
  audio.load();
  audio.play();
  songTitle.textContent = `Now Playing: ${getFileName(playlist[currentTrack])}`;

  // Update reels and button icon
  if (!audio.paused) {
    leftReel.classList.add("spin");
    rightReel.classList.add("spin");
    playPauseBtn.textContent = "⏸";
  } else {
    leftReel.classList.remove("spin");
    rightReel.classList.remove("spin");
    playPauseBtn.textContent = "▶";
  }
}

// Extract filename
function getFileName(path) {
  const parts = path.split("/");
  return parts[parts.length - 1].replace(".mp3", "");
}

window.addEventListener("scroll", () => {
  const scrollBox = document.getElementById("scrollBox");
  if (window.scrollY > 100) {
    scrollBox.style.opacity = "1";
  }
});

document.getElementById("hoverBtn").addEventListener("click", function () {
  window.open("../html/1.html", "_blank"); // Replace with your actual link
});
