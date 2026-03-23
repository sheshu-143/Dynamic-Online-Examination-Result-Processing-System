// Exams page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    loadExams();
});

async function loadExams() {
    try {
        const exams = await apiRequest('/api/exams');
        const container = document.getElementById('examsContainer');

        if (exams.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem;">No exams available at the moment.</p>';
            return;
        }

        let html = '';
        exams.forEach(exam => {
            html += `
                <div class="exam-card">
                    <h3>${exam.exam_title}</h3>
                    <p><strong>Subject:</strong> ${exam.subject_name}</p>
                    <p>${exam.exam_description || 'No description'}</p>
                    <div class="exam-meta">
                        <span>Questions: ${exam.total_questions}</span>
                        <span>Duration: ${exam.duration_minutes} min</span>
                    </div>
                    <div class="exam-meta">
                        <span>Total Marks: ${exam.total_marks}</span>
                    </div>
                    <button class="btn btn-primary" onclick="startExam(${exam.exam_id})">Start Exam</button>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (error) {
        const container = document.getElementById('examsContainer');
        container.innerHTML = `<p style="color: red; text-align: center;">Error loading exams. Please try again.</p>`;
    }
}

function startExam(examId) {
    if (!isLoggedIn()) {
        showAlert('Please login to start the exam', 'info');
        window.location.href = '/login';
        return;
    }

    // Store current exam ID and redirect
    localStorage.setItem('currentExamId', examId);
    window.location.href = `/exam?id=${examId}`;
}
