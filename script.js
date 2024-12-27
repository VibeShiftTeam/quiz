let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const retryButton = document.getElementById("retry-button");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const questionText = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const scoreText = document.getElementById("score");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
retryButton.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.style.display = "none";
    quizSection.style.display = "block";
    resultSection.style.display = "none";
    loadQuestion();
}

function loadQuestion() {
    const question = prefectures[currentQuestionIndex];
    questionText.textContent = `${question.name}の県庁所在地は？`;
    answersDiv.innerHTML = "";

    const options = generateOptions(question.capital);
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option === question.capital));
        answersDiv.appendChild(button);
    });

    nextButton.style.display = "none";
}

function generateOptions(correctAnswer) {
    const incorrectOptions = prefectures
        .filter(pref => pref.capital !== correctAnswer)
        .map(pref => pref.capital)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    return [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);
}

function checkAnswer(isCorrect) {
    if (isCorrect) score++;
    nextButton.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < prefectures.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizSection.style.display = "none";
    resultSection.style.display = "block";
    scoreText.textContent = `あなたのスコアは ${score} / ${prefectures.length} 点です！`;
}
