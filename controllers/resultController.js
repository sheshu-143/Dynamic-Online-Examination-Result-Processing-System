const db = require('../config/database');

// Get student results
exports.getStudentResults = (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT r.result_id, r.exam_id, e.exam_title, s.subject_name,
               r.total_marks, r.marks_obtained, r.percentage, r.status,
               r.completed_at, e.duration_minutes
        FROM results r
        JOIN exams e ON r.exam_id = e.exam_id
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE r.user_id = ?
        ORDER BY r.completed_at DESC
    `;

    db.query(query, [userId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(results);
    });
};

// Get result by ID
exports.getResultById = (req, res) => {
    const resultId = req.params.id;
    const userId = req.userId;

    const query = `
        SELECT r.*, e.exam_title, s.subject_name
        FROM results r
        JOIN exams e ON r.exam_id = e.exam_id
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE r.result_id = ? AND r.user_id = ?
    `;

    db.query(query, [resultId, userId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json(results[0]);
    });
};

// Get all results (admin only)
exports.getAllResults = (req, res) => {
    const query = `
        SELECT r.result_id, r.exam_id, e.exam_title, u.username, u.email,
               r.total_marks, r.marks_obtained, r.percentage, r.status,
               r.completed_at
        FROM results r
        JOIN exams e ON r.exam_id = e.exam_id
        JOIN users u ON r.user_id = u.user_id
        ORDER BY r.completed_at DESC
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(results);
    });
};
