const bcryptjs = require('bcryptjs');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Helper for DB errors
function sendDbError(res, location, error) {
    const errMsg = error && (error.sqlMessage || error.message || 'Database error');
    console.error(`[${location}]`, error);
    return res.status(500).json({
        message: `${errMsg}`,
        location,
        code: error && error.code
    });
}

// Register
exports.register = (req, res) => {
    const { username, email, password, passwordConfirm, firstName, lastName } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return sendDbError(res, 'register-select-email', error);
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Hash password
        let hashedPassword = await bcryptjs.hash(password, 8);

        // Insert user
        db.query('INSERT INTO users (username, email, password, first_name, last_name, user_type) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, firstName, lastName, 'student'],
            (error, results) => {
                if (error) {
                    return sendDbError(res, 'register-insert-user', error);
                }

                return res.status(201).json({
                    message: 'User registered successfully'
                });
            }
        );
    });
};

// Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return sendDbError(res, 'login-select-user', error);
        }

        if (results.length === 0 || !(await bcryptjs.compare(password, results[0].password))) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: results[0].user_id, email: results[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Store in session
        req.session.userId = results[0].user_id;
        req.session.userEmail = results[0].email;

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: results[0].user_id,
            userName: results[0].username
        });
    });
};

// Logout
exports.logout = (req, res) => {
    req.session.userId = null;
    req.session.userEmail = null;
    res.status(200).render('index', {
        message: 'Logged out successfully'
    });
};

// Get current user
exports.getCurrentUser = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    db.query('SELECT user_id, username, email, first_name, last_name, user_type FROM users WHERE user_id = ?',
        [req.session.userId],
        (error, results) => {
            if (error) {
                return sendDbError(res, 'getCurrentUser', error);
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(results[0]);
        }
    );
};
