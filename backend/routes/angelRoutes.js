// backend/routes/angelRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


router.post('/submit-angel', upload.single('youtube_image'), (req, res) => {
  const {
    name, email, phone, instagram, tiktok,
    youtube, followers, niche, other_niche, description
  } = req.body;

  const youtube_image = req.file ? `/uploads/${req.file.filename}` : '';

  const sql = `INSERT INTO angels 
    (name, email, phone, instagram, tiktok, youtube, youtube_image, followers, niche, other_niche, description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    name, email, phone, instagram, tiktok,
    youtube, youtube_image, followers,
    niche, other_niche, description
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server Error');
    }
    res.redirect('/speakers.html');
  });
});

router.get('/api/speakers', (req, res) => {
  db.query('SELECT * FROM angels', (err, results) => {
    if (err) {
      console.error('Error fetching speakers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

module.exports = router;
