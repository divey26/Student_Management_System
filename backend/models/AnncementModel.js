const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true, // Assuming grade is a mandatory field
  },
  title: {
    type: String,
    required: true, // Assuming title is a mandatory field
  },
  author: {
    type: String,
    required: true, // Assuming author is a mandatory field
  },
  description: {
    type: String,
    required: true, // Assuming description is a mandatory field
  },
  timePosted: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time if not provided
  },
  links: {
    type: [String], // An array of links (optional)
    default: [], // Default empty array if no links are provided
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
