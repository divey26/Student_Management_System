const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  indexNo: {
    type: String,
    required: true,
    match: /^ST\d{5}$/, // Ensures indexNo starts with 'ST' followed by 5 digits
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  contactNo: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Assumes a 10-digit phone number
  },
  age: {
    type: Number,
    min: 5, // Assuming minimum student age is 5
    max: 20, // Assuming maximum student age is 20
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  class: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E'],  // Only allows these values
    required: true,
  },
  currentTerm: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  }
});

module.exports = mongoose.model('Student', StudentSchema);
