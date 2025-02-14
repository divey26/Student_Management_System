// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');

// Route to add a new admin
router.post('/add', adminController.addAdmin);

router.get('/', adminController.getAllAdmins); // Get all admins


// Route to edit an existing admin by ID
router.put('/edit/:adminId', adminController.editAdmin);

// Route to delete an admin by ID
router.delete('/delete/:adminId', adminController.deleteAdmin);

module.exports = router;
