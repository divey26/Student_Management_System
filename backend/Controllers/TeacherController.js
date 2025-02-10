const Teacher = require('../models/TeacherModel');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addTeacher = async (req, res) => {
  const { name, idNumber, phoneNumber, email, grade, class: className, subject } = req.body;

  // Validate grade, class, and subject
  if (grade < 1 || grade > 10) {
    return res.status(400).json({ message: 'Grade must be between 1 and 10' });
  }

  if (!['A', 'B', 'C', 'D', 'E'].includes(className)) {
    return res.status(400).json({ message: 'Class must be one of A, B, C, D, or E' });
  }

  const validSubjects = [
    'Mathematics', 'Science', 'English', 'History', 'Religion', 
    'Geography', 'Civics', 'ICT', 'English Literature', 'Tamil Literature', 
    'Commerce', 'PTS', 'PT', 'Sinhala', 'Islam'
  ];

  if (!validSubjects.includes(subject)) {
    return res.status(400).json({ message: 'Invalid subject selected' });
  }

  try {
    const newTeacher = new Teacher({ name, idNumber, phoneNumber, email, grade, class: className, subject });
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { grade, class: className, subject } = req.body;

  // Validate grade, class, and subject
  if (grade && (grade < 1 || grade > 10)) {
    return res.status(400).json({ message: 'Grade must be between 1 and 10' });
  }

  if (className && !['A', 'B', 'C', 'D', 'E'].includes(className)) {
    return res.status(400).json({ message: 'Class must be one of A, B, C, D, or E' });
  }

  const validSubjects = [
    'Mathematics', 'Science', 'English', 'History', 'Religion', 
    'Geography', 'Civics', 'ICT', 'English Literature', 'Tamil Literature', 
    'Commerce', 'PTS', 'PT', 'Sinhala', 'Islam'
  ];

  if (subject && !validSubjects.includes(subject)) {
    return res.status(400).json({ message: 'Invalid subject selected' });
  }

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
