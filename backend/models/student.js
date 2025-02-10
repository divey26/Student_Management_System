const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  indexNo: { type: String, required: true, unique: true },
  name: String,
  email: String,
  grade: { type: Number, required: true },
});

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  term: { type: Number, required: true },
  subjects: {
    math: Number,
    science: Number,
    english: Number,
    history: Number,
    geography: Number,
    ict: Number,
    art: Number,
    p_e: Number,
    health: Number,
  },
});

const Student = mongoose.model('Student', studentSchema);
const Marks = mongoose.model('Marks', marksSchema);

module.exports = { Student, Marks };
