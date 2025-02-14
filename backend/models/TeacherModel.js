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
    match: /^TR\d{5}$/
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
  subject: {
    type: String,
    required: true,
    enum: [
      'Mathematics', 'Science', 'English', 'History', 'Religion', 
      'Geography', 'Civics', 'ICT', 'English Literature', 'Tamil Literature', 
      'Commerce', 'PTS', 'PT', 'Sinhala', 'Islam'
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6  // You can adjust the length or add further validations
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
