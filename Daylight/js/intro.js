<script>
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const welcomePage = document.getElementById('page-wrapper');
    const enterBtn = document.getElementById('enterBtn');

    console.log("Loading screen will hide in 10 seconds...");

    // Fade transition between loading and welcome screen
    setTimeout(() => {
      loadingScreen.classList.add('hide');     // fades out the pink screen
      welcomePage.classList.add('show');       // fades in welcome content
      console.log("Transition done: loading screen hidden, welcome shown.");
    }, 4000); // 10 seconds

    // Redirect when the button is clicked
    enterBtn.addEventListener("click", function () {
      window.location.href = "nextpage.html"; // Replace with your destination
    });
  });
</script>
