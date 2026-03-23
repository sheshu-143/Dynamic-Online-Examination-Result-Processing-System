// Results page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    requireLogin();
    loadResults();
});

async function loadResults() {
    try {
        const results = await apiRequest('/api/results/my-results');

        if (results.length === 0) {
            document.getElementById('resultsBody').innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center;">No exam results yet.</td>
                </tr>
            `;
            return;
        }

        // Calculate statistics
        let totalExams = results.length;
        let passedExams = results.filter(r => r.status === 'passed').length;
        let failedExams = results.filter(r => r.status === 'failed').length;
        let totalPercentage = 0;

        results.forEach(r => {
            totalPercentage += parseFloat(r.percentage);
        });

        let averagePercentage = totalPercentage / totalExams;

        // Update summary cards
        document.getElementById('totalExams').textContent = totalExams;
        document.getElementById('passedExams').textContent = passedExams;
        document.getElementById('failedExams').textContent = failedExams;
        document.getElementById('averageScore').textContent = averagePercentage.toFixed(2) + '%';

        // Display results
        let html = '';
        results.forEach(result => {
            const statusClass = result.status === 'passed' ? 'status-passed' : 'status-failed';
            html += `
                <tr>
                    <td>${result.exam_title}</td>
                    <td>${result.subject_name}</td>
                    <td>${result.marks_obtained}/${result.total_marks}</td>
                    <td>${result.percentage}%</td>
                    <td class="${statusClass}">${result.status.toUpperCase()}</td>
                    <td>${formatDate(result.completed_at)}</td>
                    <td>
                        <button class="btn btn-primary" onclick="viewDetails(${result.result_id})">View</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById('resultsBody').innerHTML = html;
    } catch (error) {
        document.getElementById('resultsBody').innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: red;">Error loading results: ${error.message}</td>
            </tr>
        `;
    }
}

function viewDetails(resultId) {
    // Navigate to result details page
    window.location.href = `/result?id=${resultId}`;
}
