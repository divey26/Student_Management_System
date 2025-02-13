const { Student, Marks } = require('../models/student');

const addMarks = async (req, res) => {
  const { studentId, term, subjects } = req.body;

  if (!studentId || !term || !subjects) {
    return res.status(400).json({ error: 'Student ID, term, and subjects are required.' });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const existingMarks = await Marks.findOne({ studentId, term });
    if (existingMarks) {
      return res.status(400).json({ error: 'Marks for this term already exist.' });
    }

    const newMarks = new Marks({ studentId, term, subjects });
    await newMarks.save();

    res.status(201).json({ message: 'Marks added successfully!', marks: newMarks });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding marks.' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

const getMarksByStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const marks = await Marks.find({ studentId: id });
    if (!marks.length) {
      return res.json([]); // Return empty array instead of 404
    }
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching marks' });
  }
};

module.exports = { addMarks, getAllStudents, getMarksByStudent };
