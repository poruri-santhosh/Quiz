let selectedTopic = "";
let currentQuestionIndex = 0;
let currentQuiz = [];
let score = 0;

const quizzes = {
  html: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Links", "Home Tool Markup Language"],
      answer: 0
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: ["style", "class", "font", "styles"],
      answer: 0
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
      answer: 0
    },
    {
      question: "Which property is used to change the background color in CSS?",
      options: ["bgcolor", "background-color", "color", "background"],
      answer: 1
    }
  ],
  js: [
    {
      question: "What does JS stand for?",
      options: ["JavaScript", "Java Style", "Just Script", "Jolly Script"],
      answer: 0
    },
    {
      question: "Which of the following is a JavaScript data type?",
      options: ["String", "Number", "Boolean", "All of the above"],
      answer: 3
    }
  ],
  python: [
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".python", ".pyt", ".pt"],
      answer: 0
    },
    {
      question: "Which of the following is a valid Python variable name?",
      options: ["my-variable", "my_variable", "my variable", "my.variable"],
      answer: 1
    }
  ]
  // You can add more quizzes for different topics here

  // Add more topics like css, js, python here...
};

function selectQuiz(topic) {
  selectedTopic = topic;
  currentQuiz = quizzes[topic];
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function startTest() {
  closePopup();
  document.querySelector(".card-container").style.display = "none";
  document.querySelector(".intro").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
  const q = currentQuiz[index];
  document.getElementById("question-text").textContent = q.question;
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.classList.add("option-label");
    label.innerHTML = `<input type="radio" name="option" value="${i}"> ${opt}`;
    optionsContainer.appendChild(label);
  });
}

function loadNextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  const selectedValue = parseInt(selectedOption.value);
  if (selectedValue === currentQuiz[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showScoreProgress();
  }
}

function showScoreProgress() {
  const total = currentQuiz.length;
  const percentage = Math.round((score / total) * 100);

  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="result-container">
      <h2>Quiz Completed!</h2>
      <p>Your Score: <strong>${score} / ${total}</strong> (${percentage}%)</p>
      <div class="progress-outer">
        <div class="progress-inner" style="width: ${percentage}%;">
          ${percentage}%
        </div>
      </div>
      <button class="home-btn" onclick="goHome()">Go to Home</button>
    </div>
  `;
}

function goHome() {
  window.location.reload(); // Simple way to reset the whole page
}
