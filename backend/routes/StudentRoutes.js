const express = require('express');
const { Student } = require('../models/student');
const studentRoutes = express.Router();

// Generate Auto Index Number
studentRoutes.get('/generateIndex', async (req, res) => {
  try {
    const lastStudent = await Student.findOne().sort({ indexNo: -1 });

    let nextIndexNo;
    if (lastStudent) {
      const lastIndex = parseInt(lastStudent.indexNo.replace(/\D/g, ''), 10);
      nextIndexNo = `S${lastIndex + 1}`;
    } else {
      nextIndexNo = 'S1001';
    }

    res.status(200).json({ indexNo: nextIndexNo });
  } catch (error) {
    console.error('Error generating index number:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Add Student
studentRoutes.post('/', async (req, res) => {
  console.log('Received data:', req.body); // Debugging log

  const { indexNo, name, email, grade } = req.body;

  if (!indexNo || !name || !email || !grade) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const existingStudent = await Student.findOne({ indexNo });
    if (existingStudent) {
      return res.status(400).json({ error: 'Index Number already exists!' });
    }

    const newStudent = new Student({ indexNo, name, email, grade });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get All Students
studentRoutes.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});


studentRoutes.get('/det/:indexNo', async (req, res) => {
  try {
    const student = await Student.findOne({ indexNo: req.params.indexNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});


module.exports = { studentRoutes };
