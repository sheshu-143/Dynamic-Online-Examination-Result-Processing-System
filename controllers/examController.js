const db = require('../config/database');

// Get all exams
exports.getAllExams = (req, res) => {
    const query = `
        SELECT e.exam_id, e.exam_title, e.exam_description, s.subject_name, 
               e.total_questions, e.duration_minutes, e.total_marks, e.is_published
        FROM exams e
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE e.is_published = 1
        ORDER BY e.created_at DESC
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json(results);
    });
};

// Get exam by ID
exports.getExamById = (req, res) => {
    const examId = req.params.id;

    const query = `
        SELECT e.*, s.subject_name
        FROM exams e
        JOIN subjects s ON e.subject_id = s.subject_id
        WHERE e.exam_id = ?
    `;

    db.query(query, [examId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        res.status(200).json(results[0]);
    });
};

// Get questions for an exam
exports.getExamQuestions = (req, res) => {
    const examId = req.params.id;

    const query = `
        SELECT q.question_id, q.question_text, q.question_type, q.marks,
               o.option_id, o.option_text, o.option_number
        FROM questions q
        LEFT JOIN options o ON q.question_id = o.question_id
        WHERE q.exam_id = ?
        ORDER BY q.question_id, o.option_number
    `;

    db.query(query, [examId], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Database error' });
        }

        // Format results
        const questions = {};
        results.forEach(row => {
            if (!questions[row.question_id]) {
                questions[row.question_id] = {
                    question_id: row.question_id,
                    question_text: row.question_text,
                    question_type: row.question_type,
                    marks: row.marks,
                    options: []
                };
            }
            if (row.option_id) {
                questions[row.question_id].options.push({
                    option_id: row.option_id,
                    option_text: row.option_text,
                    option_number: row.option_number
                });
            }
        });

        res.status(200).json(Object.values(questions));
    });
};

// Submit exam
exports.submitExam = (req, res) => {
    const examId = req.params.id;
    const userId = req.userId;
    const { answers } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
        return res.status(400).json({ message: 'No answers provided' });
    }

    let totalMarks = 0;
    let marksObtained = 0;
    let answerCount = 0;

    // Get total marks and process answers
    const answerKeys = Object.keys(answers);
    let processedAnswers = 0;

    answerKeys.forEach((questionId, index) => {
        const query = `
            SELECT q.marks, o.is_correct
            FROM questions q
            LEFT JOIN options o ON q.question_id = ? AND o.option_id = ?
            WHERE q.question_id = ?
        `;

        db.query(query, [questionId, answers[questionId], questionId], (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                totalMarks += results[0].marks;
                marksObtained += results[0].is_correct ? results[0].marks : 0;
            }

            answerCount++;

            // After processing all answers
            if (answerCount === answerKeys.length) {
                // Save result
                const percentage = (marksObtained / totalMarks) * 100;
                const status = percentage >= 40 ? 'passed' : 'failed';

                const insertQuery = `
                    INSERT INTO results (exam_id, user_id, total_marks, marks_obtained, percentage, status, started_at, completed_at)
                    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
                `;

                db.query(insertQuery, [examId, userId, totalMarks, marksObtained, percentage, status], (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: 'Error saving result' });
                    }

                    res.status(200).json({
                        message: 'Exam submitted successfully',
                        result_id: result.insertId,
                        total_marks: totalMarks,
                        marks_obtained: marksObtained,
                        percentage: percentage.toFixed(2),
                        status: status
                    });
                });
            }
        });
    });
};

// Create exam (admin only)
exports.createExam = (req, res) => {
    const { subject_id, exam_title, exam_description, total_marks, duration_minutes, passing_score } = req.body;

    if (!subject_id || !exam_title || !total_marks) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO exams (subject_id, exam_title, exam_description, total_marks, duration_minutes, passing_score, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [subject_id, exam_title, exam_description, total_marks, duration_minutes, passing_score, req.userId],
        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Database error' });
            }

            res.status(201).json({
                message: 'Exam created successfully',
                exam_id: result.insertId
            });
        }
    );
};
