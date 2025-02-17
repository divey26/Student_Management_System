const Announcement = require('../models/AnncementModel');

// Controller to get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements', error: err });
  }
};

// Controller to create a new announcement
exports.createAnnouncement = async (req, res) => {
  const { grade, title, author, description, links } = req.body;

  try {
    const newAnnouncement = new Announcement({
      grade,
      title,
      author,
      description,
      links,
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Error creating announcement', error: err });
  }
};
