// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.post('/contact', (req, res) => {
//   const { name, email, phone, niche, otherNiche } = req.body;

//   const finalNiche = niche === 'Other' ? otherNiche : niche;

//   const sql = 'INSERT INTO contacts (name, email, phone, niche) VALUES (?, ?, ?, ?)';
//   const values = [name, email, phone, finalNiche];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('❌ Database insert error:', err);
//       return res.status(500).json({ message: 'Database error' });
//     }
//     res.json({ message: 'Success' });
//   });
// });

// module.exports = router;
