const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { userNo, name, password } = req.body;

    try {
        const newUser = new User({ userNo, name, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error });
    }
});


router.post('/login', async (req, res) => {
    const { userNo, password } = req.body;

    console.log('Received login request:', { userNo, password });  // Debugging line

    try {
        const user = await User.findOne({ userNo });
        if (!user) {
            console.log('User not found for userNo:', userNo);  // Debugging line
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Incorrect password for userNo:', userNo);  // Debugging line
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Determine role based on userNo prefix
        const role = userNo.startsWith('S') ? 'student' : userNo.startsWith('TR') ? 'teacher' : null;
        if (!role) {
            console.log('Invalid user number:', userNo);  // Debugging line
            return res.status(400).json({ message: 'Invalid user number' });
        }

        const token = jwt.sign({ id: user._id, userNo, role }, 'secretKey', { expiresIn: '1h' });

        console.log('Login successful for userNo:', userNo);  // Debugging line
        res.json({ token, role });
    } catch (error) {
        console.error('Error during login:', error);  // Debugging line
        res.status(500).json({ message: 'Error logging in', error });
    }
});



module.exports = router;
