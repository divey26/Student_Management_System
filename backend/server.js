const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/AdminRoutes');
const { studentRoutes } = require('./routes/StudentRoutes');
const marksRoutes = require('./routes/MarksRoutes');
const authRoutes = require('./routes/UserRoutes');
const teacherRoutes = require('./routes/TeacherRoutes');
const announcementRoutes = require('./routes/AnnouncementRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error('MongoDB connection error:', err);  // Log the MongoDB error
    process.exit(1);  // Exit process on error
  });

app.use('/api/std', studentRoutes);
app.use('/api', marksRoutes);
app.use('/api', authRoutes);  // API routes for signup and login
app.use('/api/teachers', teacherRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/announcements', announcementRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
