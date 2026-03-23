const express = require('express');
const examController = require('../controllers/examController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all exams
router.get('/', examController.getAllExams);

// Get exam by ID
router.get('/:id', examController.getExamById);

// Get questions for an exam
router.get('/:id/questions', examController.getExamQuestions);

// Submit exam answers (protected route)
router.post('/:id/submit', verifyToken, examController.submitExam);

// Create exam (admin only)
router.post('/create', verifyToken, examController.createExam);

module.exports = router;
