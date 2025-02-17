const express = require('express');
const router = express.Router();
const announcementController = require('../Controllers/AnnounceController');

// Route to get all announcements
router.get('/', announcementController.getAllAnnouncements);

// Route to create a new announcement
router.post('/', announcementController.createAnnouncement);

module.exports = router;
