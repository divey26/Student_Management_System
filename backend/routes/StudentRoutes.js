const express = require('express');
const { Student } = require('../models/student');
const studentRoutes = express.Router();

// Add Student
studentRoutes.post('/', async (req, res) => {
  const { indexNo, name, email, grade } = req.body;

  // Basic Validation
  if (!indexNo || !name || !email || !grade) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate Email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const newStudent = new Student({ indexNo, name, email, grade });
    await newStudent.save();
    res.status(201).json(newStudent); // Send the created student object
  } catch (error) {
    console.error('Error adding student:', error);  // Log full error stack
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get Student Details by ID
studentRoutes.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);  // Log full error stack
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get All Students
studentRoutes.get('/', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);  // Log full error stack
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});


module.exports = { studentRoutes };
