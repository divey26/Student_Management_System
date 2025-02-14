// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  adnumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Za-z]{2}[0-9]{4}$/, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
