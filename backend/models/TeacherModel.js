const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^TE\d{5}$/
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  class: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: [
      'Mathematics', 'Science', 'English', 'History', 'Religion', 
      'Geography', 'Civics', 'ICT', 'English Literature', 'Tamil Literature', 
      'Commerce', 'PTS', 'PT', 'Sinhala', 'Islam'
    ],
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);