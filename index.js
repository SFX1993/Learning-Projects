let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 0;
let timerId;
const questionsDirectory = [
  {
    question: "What is the Capital of Goa?",
    options: ["Panaji", "Mangalore", "Meerut", "Vizag"],
    answer: "panaji",
  },
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4",
  },
];
const questionElement = document.getElementById("questions");
const answerElement = document.getElementById("answers-container");
const resultElement = document.getElementById("result-element");
loadQuestion(currentQuestionIndex);
startTimer();

const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsDirectory.length) {
    loadQuestion(currentQuestionIndex);
    updateScoreDisplay();
  } else if (currentQuestionIndex >= questionsDirectory.length) {
    resultElement.innerHTML = `Quiz completed! Your Score is ${score} out of ${questionsDirectory.length}`;
    nextBtn.setAttribute("disabled", true);
  }
});
function loadQuestion(index) {
  questionElement.innerText = questionsDirectory[index].question;
  answerElement.innerHTML = "";

  questionsDirectory[index].options.forEach((option) => {
    const answerBtn = document.createElement("button");
    answerBtn.innerText = option;
    answerBtn.classList.add("answer-btn");
    answerBtn.addEventListener("click", () => {
      const allAnswerButtons = document.querySelectorAll(".answer-btn");
      allAnswerButtons.forEach((btn) => (btn.disabled = true));
      if (
        option.toLowerCase() === questionsDirectory[index].answer.toLowerCase()
      ) {
        answerBtn.style.backgroundColor = "green";
        score++;
      } else {
        answerBtn.style.backgroundColor = "red";
      }
    });
    answerElement.appendChild(answerBtn);
  });
}
function updateScoreDisplay() {
  document.getElementById(
    "score-display"
  ).innerText = `Score: ${score} out of ${currentQuestionIndex + 1}`;
}
function restartQuiz() {
  const restartBtn = document.getElementById("reset-btn");
  restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    nextBtn.removeAttribute("disabled");
    loadQuestion(0);
    updateScoreDisplay();
  });
}
restartQuiz();
function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = `Time Left:${timeLeft}`;
  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left:${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      disableOptions();
      setTimeout(() => {
        moveToNextQuestion();
      }, 1000);
    }
  }, 1000);
}
function disableOptions() {
  const answerBtn = document.querySelectorAll(".answer-btn");
  answerBtn.forEach((btn) => {
    btn.disabled = true;
  });
}
function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsDirectory.length) {
    loadQuestion(currentQuestionIndex);
    updateScoreDisplay();
    startTimer();
  } else {
    resultElement.innerHTML = `Quiz Completed! Your Score is ${score} out of ${questionsDirectory.length}`;
    nextBtn.setAttribute("disabled", true);
  }
}
