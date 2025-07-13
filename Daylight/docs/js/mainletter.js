window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.classList.add("hide");
    setTimeout(() => {
      loadingScreen.style.display = "none";
      startPetals?.(); // Optional animation
    }, 1000);
  }, 3000);
});

const key = document.getElementById("key");
const keyhole = document.querySelector(".keyhole");
const letter = document.getElementById("letter");
const flapTop = document.querySelector(".flap.top");
const foldedPaper = document.getElementById("folded-paper");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let envelopeUnlocked = false;
let hasSlidOut = false;

// KEY DRAG
key.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - key.offsetLeft;
  offsetY = e.clientY - key.offsetTop;
  key.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    key.style.left = `${e.clientX - offsetX}px`;
    key.style.top = `${e.clientY - offsetY}px`;

    if (!envelopeUnlocked && isNearKeyhole(key, keyhole)) {
      unlockEnvelope();
      isDragging = false;
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  key.style.cursor = "grab";
});

function isNearKeyhole(keyEl, holeEl) {
  const keyRect = keyEl.getBoundingClientRect();
  const holeRect = holeEl.getBoundingClientRect();
  return !(
    keyRect.right < holeRect.left ||
    keyRect.left > holeRect.right ||
    keyRect.bottom < holeRect.top ||
    keyRect.top > holeRect.bottom
  );
}

function unlockEnvelope() {
  const flapLeft = document.querySelector(".flap.left");
  const flapRight = document.querySelector(".flap.right");
  const flapBottom = document.querySelector(".flap.bottom");

  // Animate top flap
  flapTop.style.transition = "transform 1.2s ease";
  flapTop.style.transform = "translateY(-230px)";
  keyhole.style.transition = "top 1.2s ease, transform 1.2s ease";
  keyhole.style.top = "-150px";
  keyhole.style.transform = "translateX(-50%) scaleY(-1)";
  key.style.transition = "transform 0.5s ease";
  key.style.transform += " rotate(90deg)";

  setTimeout(() => {
    // Step 1: raise just above top flap (5), but still under side flaps (4)
    foldedPaper.style.zIndex = 5;
    foldedPaper.style.transition = "transform 1.2s ease";
    foldedPaper.style.transform = "translateY(-150px)";

    setTimeout(() => {
      // Step 2: slide back down to center and go on top of all
      foldedPaper.style.transition = "transform 1.2s ease";
      foldedPaper.style.transform = "translateY(0)";

      setTimeout(() => {
        foldedPaper.style.zIndex = 10; // now above all flaps
        hasSlidOut = true;
      }, 1300);

    }, 1400); // after slide out

  }, 800);

  envelopeUnlocked = true;
}


// CLICK TO EXPAND
foldedPaper.addEventListener("click", () => {
  if (!envelopeUnlocked || !hasSlidOut) return;

  foldedPaper.classList.toggle("expanded");

  if (foldedPaper.classList.contains("expanded")) {
    foldedPaper.style.zIndex = 10;
  } else {
    foldedPaper.style.zIndex = 10; // still above all after first slide
  }
});

  document.getElementById("back-btn").onclick = function() {
    window.location.href = "1.html"; // or "1", or "./1" depending on your file structure
  };
