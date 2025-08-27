// backend/routes/angelRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // pool.promise()
const multer = require('multer');
const path = require('path');
const transporter = require('../utils/mailer');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST: Submit Angel
router.post('/submit-angel', upload.single('youtube_image'), async (req, res) => {
  try {
    const {
      name, email, phone, instagram, tiktok, youtube,
      facebook, linkedin, followers, niche, other_niche, description
    } = req.body;

    const youtube_image = req.file ? `/uploads/${req.file.filename}` : '';

    // Save in DB
    const sql = `
      INSERT INTO angels 
      (name, email, phone, instagram, tiktok, youtube, facebook, linkedin, youtube_image, followers, niche, other_niche, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, email, phone, instagram, tiktok, youtube, facebook, linkedin,
      youtube_image, followers, niche, other_niche, description];

    await db.query(sql, values);

    // Email: Applicant
    await transporter.sendMail({
      from: '"Dubai Creator Summit" <info@dubaicreatorsummit.com>',
      to: email,
      subject: "Thank you for applying as Angel!",
      text: `Dear ${name},\n\nThank you for submitting your details. Our team will review and contact you soon.\n\nDubai Creator Summit 2025`
    });

    // Email: Admin
    await transporter.sendMail({
      from: '"Dubai Creator Summit" <info@dubaicreatorsummit.com>',
      to: "info@dubaicreatorsummit.com",
      subject: `New Angel Application Received - ${name}`,
      text: `New application received from ${name} (${email}, ${phone}).\n\n
Instagram: ${instagram || 'N/A'}\n
TikTok: ${tiktok || 'N/A'}\n
YouTube: ${youtube || 'N/A'}\n
Facebook: ${facebook || 'N/A'}\n
LinkedIn: ${linkedin || 'N/A'}\n\n
Followers: ${followers || 'N/A'}\n
Niche: ${niche || 'N/A'}\n
Other Niche: ${other_niche || 'N/A'}\n\n
Description:\n${description || 'N/A'}\n\n
📷 YouTube Image: ${youtube_image ? 'https://dubaicreatorsummit.com' + youtube_image : 'No Image'}`
    });

    // ✅ Send JSON success instead of redirect
    res.json({ success: true, message: "Form submitted successfully!" });

  } catch (err) {
    console.error('❌ Error inserting data:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET: All Speakers
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
