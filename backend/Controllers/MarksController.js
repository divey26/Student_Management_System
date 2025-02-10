// controllers/marksController.js
const { Student, Marks } = require('../models/student');

// Add marks for a student
const addMarks = async (req, res) => {
  const { studentId, term, subjects } = req.body;

  if (!studentId || !term || !subjects) {
    return res.status(400).json({ error: 'Student ID, term, and subjects are required.' });
  }

  try {
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Check if marks for the term already exist
    const existingMarks = await Marks.findOne({ studentId, term });
    if (existingMarks) {
      return res.status(400).json({ error: 'Marks for this term already exist.' });
    }

    // Create and save marks
    const newMarks = new Marks({ studentId, term, subjects });
    await newMarks.save();

    res.status(201).json({ message: 'Marks added successfully!', marks: newMarks });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding marks.' });
  }
};

// Fetch all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Fetch marks for a specific student
const getMarksByStudent = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const marks = await Marks.find({ studentId }).populate('studentId', 'name indexNo');
      if (!marks.length) {
        return res.status(404).json({ error: 'No marks found for this student.' });
      }
      res.json(marks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching marks.' });
    }
  };
  
  module.exports = { addMarks, getAllStudents, getMarksByStudent };
  

