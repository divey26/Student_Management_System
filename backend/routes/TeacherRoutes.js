// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTeachers, addTeacher, updateTeacher, deleteTeacher } = require('../Controllers/TeacherController');

router.get('/', getAllTeachers);
router.post('/', addTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;