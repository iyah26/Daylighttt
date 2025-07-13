window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");

  setTimeout(() => {
    loadingScreen.classList.add("hide");

    setTimeout(() => {
      loadingScreen.style.display = "none";

      // Start the petals
      startPetals();
    }, 1000);
  }, 3000);
});

const messages = [
  "fuck u",
  "love u blondy",
  "i can't read you, but if you want the pleasure's all mine !!",
  "ill be the greatest fan of your life : )",
  "bruh why r u 5 hours and 9196 kilometers away from me",
  "kys (lovingly)",
  "ure beautiful inside & out btw!!",
  "rip to our collab.........",
  "look at the stars, look how they shine FOR. YOU.",
  "do they look like lilies...??",
  "and now i see daylight. i only see daylight"
];

// Show one random message
function showMessage() {
  const overlay = document.getElementById("message-overlay");
  const content = document.getElementById("message-content");
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  content.textContent = randomMsg;
  overlay.classList.remove("hidden");
}

// Smoothly close message
function hideMessage() {
  const overlay = document.getElementById("message-overlay");
  const popup = overlay.querySelector(".message-popup");

  popup.style.opacity = "0";

  setTimeout(() => {
    overlay.classList.add("hidden");
    popup.style.opacity = "1"; // Reset
  }, 400);
}

// Create petals
function startPetals() {
  setInterval(() => {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    const leftPos = Math.random() * 100;
    const fallDuration = 5 + Math.random() * 5;
    const angle = Math.random() * 360;

    petal.style.left = `${leftPos}vw`;
    petal.style.animationDuration = `${fallDuration}s`;
    petal.style.setProperty('--angle', `${angle}deg`);

    petal.addEventListener("click", showMessage);

    petal.addEventListener("animationend", () => {
      petal.classList.add("resting-petal");
      petal.classList.add("land-soft");
      petal.style.animation = "none";

       // Snap to bottom of viewport
  petal.style.top = `calc(100vh - 40px)`; // adjust 30px to your petal's height
  petal.style.position = "absolute";

  // Remove the petal after 15 seconds to reduce lag
setTimeout(() => {
  petal.remove();
}, 15000);

      // Move to #petal-floor
      document.getElementById("petal-floor").appendChild(petal);
    });

    document.body.appendChild(petal);
  }, 300);
}

// Single load event
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");

  setTimeout(() => {
    loadingScreen.classList.add("hide");
    setTimeout(() => {
      loadingScreen.style.display = "none";
      startPetals();
    }, 1000);
  }, 3000);
});

// Close message box
document.getElementById("close-button").addEventListener("click", hideMessage);
document.getElementById("message-overlay").addEventListener("click", (e) => {
  if (e.target.id === "message-overlay") hideMessage();
});

// Make resting petals react to the cursor
document.addEventListener("mousemove", (e) => {
  const petals = document.querySelectorAll(".resting-petal");

  petals.forEach((petal) => {
    const rect = petal.getBoundingClientRect();
    const petalX = rect.left + rect.width / 2;
    const petalY = rect.top + rect.height / 2;

    const dx = e.clientX - petalX;
    const dy = e.clientY - petalY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const threshold = 80; // distance to react

    if (distance < threshold) {
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * -30; // away from mouse
      const moveY = Math.sin(angle) * -30;

      petal.style.transition = "transform 0.3s ease";
      petal.style.transform = `translate(${moveX}px, ${moveY}px) rotate(var(--angle)) scale(0.7)`;

      // Reset back after a short delay
      clearTimeout(petal.resetTimeout);
      petal.resetTimeout = setTimeout(() => {
        petal.style.transform = `translate(0, 0) rotate(var(--angle)) scale(0.7)`;
      }, 300);
    }
  });
});


// 🌸 Lily Spin Animation
const lilyBox = document.getElementById("lilyBox");
const lily = document.getElementById("lily");

lilyBox.addEventListener("click", () => {
  lily.style.transition = "transform 0.8s ease-out";
  lily.style.transform = "rotate(1440deg)";

  setTimeout(() => {
    lily.style.transition = "none";
    lily.style.transform = "rotate(0deg)";
  }, 850);
});

