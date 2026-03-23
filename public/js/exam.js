// Exam page JavaScript

let currentExamId = null;
let currentQuestionIndex = 0;
let questions = [];
let answers = {};
let timerInterval = null;
let timeRemaining = 0;

document.addEventListener('DOMContentLoaded', function () {
    requireLogin();
    
    // Get exam ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentExamId = urlParams.get('id');

    if (!currentExamId) {
        showAlert('No exam selected', 'error');
        window.location.href = '/exams';
        return;
    }

    loadExam();
});

async function loadExam() {
    try {
        // Load exam details
        const exam = await apiRequest(`/api/exams/${currentExamId}`);
        document.getElementById('examTitle').textContent = exam.exam_title;

        // Load questions
        questions = await apiRequest(`/api/exams/${currentExamId}/questions`);

        if (questions.length === 0) {
            showAlert('No questions available for this exam', 'error');
            return;
        }

        // Initialize timer
        timeRemaining = exam.duration_minutes * 60; // Convert to seconds
        startTimer();

        // Initialize answers object
        questions.forEach(q => {
            answers[q.question_id] = null;
        });

        // Display questions
        displayQuestions();
        displayQuestionNavigation();
    } catch (error) {
        showAlert('Error loading exam: ' + error.message, 'error');
    }
}

function displayQuestions() {
    const container = document.getElementById('questionsContainer');
    let html = '';

    questions.forEach((question, index) => {
        html += `
            <div class="question-container" id="question-${question.question_id}">
                <h4>Question ${index + 1} (${question.marks} marks)</h4>
                <p>${question.question_text}</p>
                <div class="options" id="options-${question.question_id}">
        `;

        if (question.question_type === 'mcq') {
            question.options.forEach(option => {
                html += `
                    <div class="option">
                        <input type="radio" id="option-${option.option_id}" 
                               name="question-${question.question_id}" 
                               value="${option.option_id}"
                               onchange="recordAnswer(${question.question_id}, ${option.option_id})">
                        <label for="option-${option.option_id}">${option.option_text}</label>
                    </div>
                `;
            });
        } else if (question.question_type === 'true_false') {
            html += `
                <div class="option">
                    <input type="radio" id="true-${question.question_id}" 
                           name="question-${question.question_id}" 
                           value="true"
                           onchange="recordAnswer(${question.question_id}, 'true')">
                    <label for="true-${question.question_id}">True</label>
                </div>
                <div class="option">
                    <input type="radio" id="false-${question.question_id}" 
                           name="question-${question.question_id}" 
                           value="false"
                           onchange="recordAnswer(${question.question_id}, 'false')">
                    <label for="false-${question.question_id}">False</label>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function displayQuestionNavigation() {
    const container = document.getElementById('questionsList');
    let html = '';

    questions.forEach((question, index) => {
        html += `
            <button class="question-btn" id="qbtn-${question.question_id}" 
                    onclick="jumpToQuestion(${index})">
                ${index + 1}
            </button>
        `;
    });

    container.innerHTML = html;
}

function recordAnswer(questionId, answer) {
    answers[questionId] = answer;
    updateQuestionButton(questionId);
}

function updateQuestionButton(questionId) {
    const btn = document.getElementById(`qbtn-${questionId}`);
    if (answers[questionId] !== null) {
        btn.classList.add('answered');
    } else {
        btn.classList.remove('answered');
    }
}

function jumpToQuestion(index) {
    const question = questions[index];
    currentQuestionIndex = index;

    // Update button states
    document.querySelectorAll('.question-btn').forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Scroll to question
    const element = document.getElementById(`question-${question.question_id}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function startTimer() {
    document.getElementById('timer').textContent = formatTime(timeRemaining);

    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = formatTime(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }

        // Warn when 5 minutes left
        if (timeRemaining === 300) {
            showAlert('Warning: Only 5 minutes remaining!', 'info');
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

async function submitExam() {
    clearInterval(timerInterval);

    // Check if all questions are answered
    const unanswered = questions.filter(q => answers[q.question_id] === null).length;
    
    if (unanswered > 0) {
        const confirmSubmit = confirm(`${unanswered} questions are unanswered. Submit anyway?`);
        if (!confirmSubmit) {
            startTimer();
            return;
        }
    }

    try {
        const result = await apiRequest(`/api/exams/${currentExamId}/submit`, 'POST', {
            answers: answers
        });

        showAlert('Exam submitted successfully!', 'success');
        
        // Redirect to results after 2 seconds
        setTimeout(() => {
            window.location.href = '/results';
        }, 2000);
    } catch (error) {
        showAlert('Error submitting exam: ' + error.message, 'error');
        startTimer();
    }
}

document.getElementById('submitBtn')?.addEventListener('click', submitExam);

document.getElementById('cancelBtn')?.addEventListener('click', function () {
    if (confirm('Are you sure you want to cancel this exam?')) {
        clearInterval(timerInterval);
        window.location.href = '/exams';
    }
});
