// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTeachers, addTeacher, updateTeacher, deleteTeacher, getTeacherByIdNumber,getTeachersByGrade } = require('../Controllers/TeacherController');

router.get('/', getAllTeachers);
router.post('/', addTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);
router.get('/:idNumber', getTeacherByIdNumber);  // Add this route for fetching teacher by idNumber
//router.get('/grade/:grade', getTeachersByGrade);

module.exports = router;
