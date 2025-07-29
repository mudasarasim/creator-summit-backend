const express = require('express');
const router = express.Router();
const db = require('../db'); // Update path if needed

// POST /api/vote
router.post('/vote', (req, res) => {
  const { name, email, phone, speaker } = req.body;

  if (!name || !email || !phone || !speaker) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO votes (name, email, phone, speaker) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, speaker], (err, result) => {
    if (err) {
      console.error('Error inserting vote:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.json({ message: 'Vote submitted successfully!' });
  });
});
// GET /api/admin/votes
router.get('/', (req, res) => {
  db.query('SELECT * FROM votes ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error fetching votes:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// GET vote results by speaker
router.get('/vote-results', (req, res) => {
  const sql = `
    SELECT speaker, COUNT(*) as total_votes
    FROM votes
    GROUP BY speaker
    ORDER BY total_votes DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching vote results:", err);
      return res.status(500).json({ message: "Error fetching vote results" });
    }
    res.json(results);
  });
});
// GET /api/top-votes
router.get('/api/speakers', (req, res) => {
  const sql = 'SELECT * FROM speakers ORDER BY votes DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});
module.exports = router;
