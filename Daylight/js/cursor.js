// 🌸 Lily Cursor Follower
const lilyCursor = document.getElementById('lilyCursor');

document.addEventListener('mousemove', (e) => {
  lilyCursor.style.top = `${e.clientY}px`;
  lilyCursor.style.left = `${e.clientX}px`;
});
