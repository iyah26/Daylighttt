function checkAnswer() {
  const input = document.getElementById("answerInput").value.trim().toLowerCase();
  const response = document.getElementById("responseMessage");

  const validAnswers = ["phone", "my phone", "iphone"];
  const hateAnswers = ["i hate you", "i hate u"];

  if (validAnswers.includes(input)) {
    window.location.href = "../html/intro.html"; // ✅ Redirect
  } else if (hateAnswers.includes(input)) {
    response.textContent = "love u too";
    response.style.color = "#ff5c8a"; // soft pink-red
  } else {
    response.textContent = "wrong u fake";
    response.style.color = "#d70040"; // strong red
  }
}

// Let "Enter" act as clicking submit
document.getElementById("answerInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
