// Main JavaScript for Online Examination System

// Check if user is logged in
function isLoggedIn() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return token || userId;
}

// Get user data from localStorage
function getUserData() {
    return {
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
        userEmail: localStorage.getItem('userEmail'),
        token: localStorage.getItem('token')
    };
}

// Store user data
function setUserData(userData) {
    if (userData.userId) localStorage.setItem('userId', userData.userId);
    if (userData.userName) localStorage.setItem('userName', userData.userName);
    if (userData.userEmail) localStorage.setItem('userEmail', userData.userEmail);
    if (userData.token) localStorage.setItem('token', userData.token);
}

// Clear user data
function clearUserData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
}

// Logout function
function logout() {
    clearUserData();
    window.location.href = '/';
}

// API request helper
async function apiRequest(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Add token if available
    const userData = getUserData();
    if (userData.token) {
        options.headers['Authorization'] = `Bearer ${userData.token}`;
    }

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            console.error('API Error:', result.message);
            if (response.status === 401) {
                // Unauthorized - redirect to login
                clearUserData();
                window.location.href = '/login';
            }
            throw new Error(result.message || 'API Error');
        }

        return result;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format percentage
function formatPercentage(value) {
    return parseFloat(value).toFixed(2) + '%';
}

// Redirect to login if not authenticated
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = '/login';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Global initialization code
    console.log('Online Examination System loaded');

    // if user is logged in, adjust navigation links
    if (isLoggedIn()) {
        const nav = document.querySelector('.nav-menu');
        if (nav) {
            nav.innerHTML = `
                <a href="/" class="nav-link">Home</a>
                <a href="/exams" class="nav-link">Exams</a>
                <a href="/results" class="nav-link">My Results</a>
                <a href="/profile" class="nav-link">Profile</a>
                <a href="#" onclick="logout()" class="nav-link">Logout</a>
            `;
        }

        // optionally show greeting if hero section exists
        const heroContainer = document.querySelector('.hero .container');
        if (heroContainer) {
            const p = document.createElement('p');
            p.className = 'greeting';
            p.textContent = `Welcome back, ${getUserData().userName}!`;
            heroContainer.insertBefore(p, heroContainer.firstChild);
        }
    }
});
