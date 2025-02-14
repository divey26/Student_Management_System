// controllers/adminController.js
const Admin = require('../models/AdminModel');

// Add a new admin
exports.addAdmin = async (req, res) => {
  try {
    const { name, adnumber, email, phoneNumber } = req.body;
    const newAdmin = new Admin({ name, adnumber, email, phoneNumber });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error adding admin', error: err.message });
  }
};


// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching admins', error: err.message });
    }
  };
  

// Edit an existing admin
exports.editAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { name, adnumber, email, phoneNumber } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, adnumber, email, phoneNumber },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Error editing admin', error: err.message });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting admin', error: err.message });
  }
};
