const express = require('express');
const resultController = require('../controllers/resultController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get student results (protected route)
router.get('/my-results', verifyToken, resultController.getStudentResults);

// Get result by ID
router.get('/:id', verifyToken, resultController.getResultById);

// Get all results (admin only)
router.get('/admin/all-results', verifyToken, resultController.getAllResults);

module.exports = router;
