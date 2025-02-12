// routes/marksRoutes.js
const express = require('express');
const router = express.Router();
const { addMarks, getAllStudents, getMarksByStudent} = require('../Controllers/MarksController');

// Route to add marks
router.post('/marks', addMarks);

// Route to get all students
router.get('/std', getAllStudents);

router.get('/std/:id', getMarksByStudent);

module.exports = router;
