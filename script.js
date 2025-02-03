// Get references to the DOM elements
const paw = document.getElementById("paw");
const mouse = document.getElementById("mouse");
const scoreDisplay = document.getElementById("score");
const victoryPopup = document.getElementById("victory");

let score = 0;
let gameOver = false;
let isDamaged = false;
let moveInterval;

// Make the cat's paw follow the mouse cursor
document.addEventListener("mousemove", (event) => {
  // Center the paw (50x50) on the cursor position
  paw.style.left = `${event.clientX - 25}px`;
  paw.style.top = `${event.clientY - 25}px`;
});

// Mouse movement variables
// Updated so that the mouse (100px wide) stays within bounds
let mouseX = Math.random() * (window.innerWidth - 100);
let mouseY = Math.random() * (window.innerHeight - 100);
let speedX = 3;
let speedY = 2;

// Function to move the mouse smoothly
function moveMouse() {
  if (gameOver || isDamaged) return;

  mouseX += speedX;
  mouseY += speedY;

  // Bounce off the screen edges (using 100 since the mouse is now 100px)
  if (mouseX <= 0 || mouseX >= window.innerWidth - 100) speedX *= -1;
  if (mouseY <= 0 || mouseY >= window.innerHeight - 100) speedY *= -1;

  // Update the mouse position on screen
  mouse.style.left = `${mouseX}px`;
  mouse.style.top = `${mouseY}px`;
}

// Start the mouse movement (updates every 20ms)
moveInterval = setInterval(moveMouse, 20);

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// On click, check if the cat's paw overlaps the mouse and apply damage
document.addEventListener("click", () => {
  if (gameOver || isDamaged) return;

  const pawRect = paw.getBoundingClientRect();
  const mouseRect = mouse.getBoundingClientRect();

  // Check if the paw and mouse are overlapping
  if (
    pawRect.left < mouseRect.right &&
    pawRect.right > mouseRect.left &&
    pawRect.top < mouseRect.bottom &&
    pawRect.bottom > mouseRect.top
  ) {
    // Increase the score and update the display
    score++;
    updateScore();

    // Set the mouse into a "damaged" state and change its image
    isDamaged = true;
    mouse.src = "./damage.png";

    if (score >= 10) {
      // When reaching 10 hits, the mouse "dies"
      gameOver = true;
      clearInterval(moveInterval);
      mouse.src = "./dead.png";
      setTimeout(() => {
        victoryPopup.style.display = "block";
      }, 500);
    } else {
      // If not game over, pause movement while damaged, then recover after 1 second
      clearInterval(moveInterval);
      setTimeout(() => {
        mouse.src = "./c1.png"; // Return to normal mouse image
        isDamaged = false;
        moveInterval = setInterval(moveMouse, 20); // Resume movement
      }, 1000);
    }
  }
});
