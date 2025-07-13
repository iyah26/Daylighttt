// 🎮 Mario Maze Game with Questions, WASD, Timer, and Trail

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

document.addEventListener("DOMContentLoaded", () => {
  const mazeContainer = document.getElementById("maze");
  const size = 40;
  const maze = Array.from({ length: size }, () => Array(size).fill(1));
  let playerPos = { row: 0, col: 0 };
  const keyPos = { row: size - 1, col: size - 1 };

  const directions = [[-2, 0], [0, 2], [2, 0], [0, -2]];
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateMaze(row = 0, col = 0) {
    maze[row][col] = 0;
    const dir = [...directions];
    shuffle(dir);
    for (const [dr, dc] of dir) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        newRow >= 0 && newRow < size &&
        newCol >= 0 && newCol < size &&
        maze[newRow][newCol] === 1
      ) {
        maze[row + dr / 2][col + dc / 2] = 0;
        generateMaze(newRow, newCol);
      }
    }
  }

  function drawMaze() {
    mazeContainer.innerHTML = '';
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (maze[row][col] === 0) cell.classList.add('path');
        if (row === playerPos.row && col === playerPos.col) cell.classList.add('player');
        if (row === keyPos.row && col === keyPos.col) cell.classList.add('key');
        mazeContainer.appendChild(cell);
      }
    }
  }

  // TIMER: 30-minute countdown
  let totalTime = 30 * 60;
  const timerDisplay = document.getElementById("timer");
  const timerInterval = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      endGameTimeout();
    } else {
      totalTime--;
      const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
      const seconds = (totalTime % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${minutes}:${seconds}`;
    }
  }, 1000);

  function endGameTimeout() {
    const modal = document.createElement("div");
    modal.classList.add("timeout-modal");
    modal.innerHTML = `
      <div class="modal-content">
        <h2>⏰ Time's up!</h2>
        <p>You ran out of time. Want to try again?</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

 const questionSets = [
  // 🔵 FIRST SET: all short-answer
  [
    { q: "What was the VERY FIRST THING you said to me? (in a gc)", a: ["dark wings rise"] },
    { q: "What's my second name?", a: ["rich"] },
    { q: "What's the thing that hit you in PE class?", a: ["a ball", "ball"] },
    { q: "What was Jeff Buckley's only complete studio album?", a: ["grace"] },
    { q: "What did you say about Emma again?", a: ["she was one of us"] },
    { q: "Aria dated Ezra for 4 seasons straight. If each season has 25 episodes, how many episodes did she make us collectively uncomfortable?", a: ["100 episodes", "100", "100 eps"] },
    { q: "What am I allergic to?", a: ["coffee"] },
    { q: "Are you enjoying this", a: ["yes"] },
    { q: "Pinned you against the what? XD *giggles*", a: ["wall"] },
    { q: "Three receiving stations are located on a coordinate plane at points (1, 4), (-3,-1), and (5, 2). The distance from the earthquake epicenter to each station should be 2 units, 5 units, and 4 units respectively. Locate the epicenter of the earthquake.", a: ["(1, 2)", "1,2"] }
  ],

  // 🟢 SECOND SET: mix of short and multiple choice
  [
    { q: "Who was Jeff Buckley's biggest inspiration?", a: ["nusrat fateh ali khan"] },
    { q: "Where was *Call Me By Your Name* set?", a: ["crema"], choices: ["Siena", "Parma", "your house", "Crema"], correct: "D" },
    { q: "What was Seth Cohen's comic book called?", a: ["atomic county"] },
    { q: "You're the Ezra to my _______", a: ["gun"] },
    { q: "What's the stuffed toy (and color) sitting on top of my poster gift for you?", a: ["a green bunny", "green bunny", "bunny (green)"], choices: ["A green bunny", "A green fox", "A green beagle", "A green serval"], correct: "A" },
    { q: "What does Aria famously do that NO ONE ELSE IN THE GROUP SEEMS TO DO??", a: ["date her teacher"] },
    { q: "You binge *The OC* for a week straight. You watch 5 episodes a day. How many episodes have you watched total?", a: ["35", "35 episodes", "35 eps"] },
    { q: "Guess the Miraculous character 😁🌹🪞", a: ["kagami"] },
    { q: "I'll be _____ for you ;)", a: ["smooth"] },
    { q: "If g(x) = (x – 1) / (x + 2) and h(x) = (3x) / 2, what is (g ∘ h)(x)?", a: ["3x^2 – 3x / 2x + 4", "(3x^2 - 3x)/(2x + 4)"] }
  ],

  // 🟣 THIRD SET: also mixed
  [
    { q: "What language does Timothée speak besides English?", a: ["french"] },
    { q: "What is Diluc’s weapon of choice?", a: ["claymore"] },
    { q: "What animal did you love as a kid but not so much anymore? Clue: their tail hit me sm", a: ["horse", "horses"] },
    { q: "Timothée Chalamet starred in all except:", a: ["interstellar"], choices: ["Dune", "Little Women", "Lady Bird", "Interstellar"], correct: "D" },
    { q: "What’s the name of Alice’s cat in *Alice in Wonderland*?", a: ["dinah"] },
    { q: "Lana releases an album with 12 songs. If each song is 3.5 minutes long, and you listen to the album 4 times in a row, how many minutes have you listened to Laufey?", a: ["168 minutes", "168"] },
    { q: "What's my (brainrot) nickname for you?", a: ["my demon boy"] },
    { q: "What do koalas mostly eat?", a: ["eucalyptus"], choices: ["Bamboo", "Grass", "Your will to live", "Eucalyptus"], correct: "D" },
    { q: "What is Snoopy?", a: ["a beagle", "beagle"] },
    { q: "10. A flashlight mirror has the shape of and a paraboloid with a diameter of 6 inches depth of inches. How far from the vertex (0, 0) of the mirror should the bulb be placed so that the emitted light rays are parallel to the axis of the Paraboloid? Give your answer in inches.", a: ["0.75", "0.75 inches", "0.75 inch"] }
  ]
];

  const questions = questionSets[Math.floor(Math.random() * questionSets.length)];

  const modal = document.getElementById("question-modal");
  const qText = document.getElementById("question-text");
  const qInput = document.getElementById("question-answer");
  const qButton = document.getElementById("submit-answer");
  const feedback = document.getElementById("feedback");
  const buttonContainer = document.getElementById("mc-buttons");

  let moveCount = 0;
  let questionsAsked = 0;
  let allowMove = true;
  const questionTurns = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 70) + 5
  ).sort((a, b) => a - b);

  function askQuestion(index) {
  const current = questions[index];
  modal.classList.remove("hidden");
  qText.textContent = current.q;
  feedback.textContent = '';

  const inputBox = qInput;
  const submitBtn = qButton;

  // Hide all by default
  inputBox.classList.add("hidden");
  submitBtn.classList.add("hidden");
  buttonContainer.innerHTML = '';
  buttonContainer.classList.remove("hidden");

  if (current.choices) {
    const labels = ['A', 'B', 'C', 'D'];
    current.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.textContent = `${labels[i]}. ${choice}`;
      btn.classList.add("mc-choice");
      btn.onclick = () => {
        const selectedLetter = labels[i];
        const correctLetter = current.correct;
        const selectedAnswer = choice.toLowerCase();
        const correctAnswers = current.a.map(x => x.toLowerCase());

        if (selectedLetter === correctLetter || correctAnswers.includes(selectedAnswer)) {
          modal.classList.add("hidden");
          allowMove = true;
        } else {
          feedback.textContent = "HAHA WRONG ❌";
        }
      };
      buttonContainer.appendChild(btn);
    });
  } else {
    buttonContainer.classList.add("hidden");
    inputBox.classList.remove("hidden");
    submitBtn.classList.remove("hidden");
    inputBox.value = '';
    inputBox.focus();

    const handleSubmit = () => {
      const answer = inputBox.value.trim().toLowerCase();
      const isCorrect = current.a.some(acc => acc.toLowerCase() === answer);
      if (isCorrect) {
        modal.classList.add("hidden");
        allowMove = true;
      } else {
        feedback.textContent = "HAHA WRONG ❌";
        inputBox.focus();
      }
    };

    submitBtn.onclick = handleSubmit;
    inputBox.onkeydown = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
  }
}



  function movePlayer(dx, dy) {
    if (!allowMove) return;

    const newRow = playerPos.row + dy;
    const newCol = playerPos.col + dx;

    if (
      newRow >= 0 && newRow < size &&
      newCol >= 0 && newCol < size &&
      maze[newRow][newCol] === 0
    ) {
      moveCount++;

      if (
        questionsAsked < 9 &&
        moveCount >= questionTurns[questionsAsked]
      ) {
        allowMove = false;
        askQuestion(questionsAsked);
        questionsAsked++;
        return;
      }

      if (
        questionsAsked < 10 &&
        Math.abs(newRow - keyPos.row) <= 1 &&
        Math.abs(newCol - keyPos.col) <= 1
      ) {
        allowMove = false;
        askQuestion(9);
        questionsAsked++;
        return;
      }

      const prevIndex = playerPos.row * size + playerPos.col;
      mazeContainer.children[prevIndex].classList.add("trail");

      playerPos.row = newRow;
      playerPos.col = newCol;
      drawMaze();

      checkWin(newRow, newCol);
    }
  }

  function checkWin(row, col) {
    if (row === keyPos.row && col === keyPos.col) {
      document.getElementById("success-modal").classList.remove("hidden");
      const sound = document.getElementById("celebration-sound");
      sound.currentTime = 0;
      sound.play();
      triggerFireworks();
      const keyIndex = row * size + col;
      mazeContainer.children[keyIndex].classList.add("key-glow");
    }
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        movePlayer(0, -1);
        break;
      case "ArrowDown":
      case "s":
      case "S":
        movePlayer(0, 1);
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        movePlayer(-1, 0);
        break;
      case "ArrowRight":
      case "d":
      case "D":
        movePlayer(1, 0);
        break;
    }
  });

  generateMaze();
  maze[0][0] = 0;
  maze[size - 1][size - 1] = 0;
  const neighbors = [[size - 2, size - 1], [size - 1, size - 2]];
  if (!neighbors.some(([r, c]) => maze[r][c] === 0)) {
    maze[neighbors[0][0]][neighbors[0][1]] = 0;
  }

  drawMaze();
});

// Fireworks 🎆
function triggerFireworks() {
  const container = document.getElementById("fireworks");
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 100}vh`;
    firework.style.setProperty('--x', (Math.random() - 0.5) * 200);
    firework.style.setProperty('--y', (Math.random() - 0.5) * 200);
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
    container.appendChild(firework);
    setTimeout(() => firework.remove(), 3000);
  }
}

// 🎮 Mobile Controls
function simulateKey(key) {
  const event = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(event);
}

document.querySelector(".ctrl.up").addEventListener("click", () => simulateKey("ArrowUp"));
document.querySelector(".ctrl.down").addEventListener("click", () => simulateKey("ArrowDown"));
document.querySelector(".ctrl.left").addEventListener("click", () => simulateKey("ArrowLeft"));
document.querySelector(".ctrl.right").addEventListener("click", () => simulateKey("ArrowRight"));

document.getElementById("next-btn").onclick = () => {
  window.location.href = "../html/mainletter.html";
};
