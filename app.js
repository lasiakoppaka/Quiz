// 1) Data: array of question objects
const quizData = [
  {
    question:
      "Which HTML element is used to include JavaScript code inside an HTML file?",
    options: ["<style>", "<script>", "<code>", "<js>"],
    answer: 1,
  },
  {
    question:
      "In CSS, which property is used to change the text color of an element?",
    options: ["background-color", "font-style", "color", "text-color"],
    answer: 2,
  },
  {
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: 2,
  },
];

// 2) Grab DOM nodes
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-button");

const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-button");

// 3) State
let currentIndex = 0;
let score = 0;
let locked = false; // prevents double-clicks

// 4) Render current question
function renderQuestion() {
  // Finished? show score
  if (currentIndex >= quizData.length) {
    showScore();
    return;
  }

  const q = quizData[currentIndex];
  questionContainer.textContent = `Question ${currentIndex + 1} of ${
    quizData.length
  }: ${q.question}`;

  // Clear options
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
  locked = false;

  // Create buttons
  q.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => handleSelect(i));
    optionsContainer.appendChild(btn);
  });
  if (currentIndex === quizData.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

// 5) Handle selection
function handleSelect(index) {
  if (locked) return;
  locked = true;

  const q = quizData[currentIndex];
  const children = [...optionsContainer.children];

  children.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    if (i === index && index !== q.answer) btn.classList.add("incorrect");
  });

  if (index === q.answer) score++;
  nextBtn.disabled = false;
}

// 6) Next question
nextBtn.addEventListener("click", () => {
  currentIndex++;
  renderQuestion();
});

// 7) Score + restart
function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}.`;
}

restartBtn.addEventListener("click", () => {
  // reset state
  currentIndex = 0;
  score = 0;
  // toggle screens
  scoreContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  // render first
  renderQuestion();
});

// 8) Kick off
renderQuestion();
