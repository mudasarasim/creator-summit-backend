const express = require('express');
const router = express.Router();
const db = require('../db');  // pool.promise()
const multer = require('multer');
const path = require('path');

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // ✅ Allow up to 50MB uploads
  }
});

// ✅ POST: Submit Angel (no email sending)
router.post('/submit-angel', upload.single('youtube_image'), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      instagram,
      tiktok,
      youtube,
      facebook,
      linkedin,
      followers,
      niche,
      other_niche,
      description
    } = req.body;

    const youtube_image = req.file ? `/uploads/${req.file.filename}` : '';

    // 🧠 Adjust if your table does not include other_niche
    const sql = `
      INSERT INTO angels 
      (name, email, phone, instagram, tiktok, youtube, facebook, linkedin, youtube_image, followers, niche, other_niche, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name, email, phone, instagram, tiktok, youtube, facebook, linkedin,
      youtube_image, followers, niche, other_niche, description
    ];

    await db.query(sql, values);

    res.json({ success: true, message: "Form submitted successfully!" });

  } catch (err) {
    console.error('❌ Error inserting data:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// ✅ GET: All Speakers
router.get('/api/speakers', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM angels');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching speakers:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
