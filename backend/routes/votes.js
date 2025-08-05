const express = require('express');
const router = express.Router();
const db = require('../db'); // Update path if needed

// POST /api/vote
router.post('/vote', (req, res) => {
  const { name, email, phone, speaker } = req.body;

  if (!name || !email || !phone || !speaker) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // First check if the email already exists
  const checkQuery = 'SELECT * FROM votes WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Email already voted
      return res.status(400).json({ message: 'You have already voted with this email.' });
    }

    // Insert vote
    const insertQuery = 'INSERT INTO votes (name, email, phone, speaker) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, email, phone, speaker], (err, result) => {
      if (err) {
        console.error('Error inserting vote:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json({ message: 'Vote submitted successfully!' });
    });
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
// GET /api/speakers/:name (single speaker by name)
router.get('/speakers/:name', (req, res) => {
  const speakerName = req.params.name;
  const sql = "SELECT * FROM angels WHERE name = ?";

  db.query(sql, [speakerName], (err, results) => {
    if (err) {
      console.error("Error fetching speaker:", err);
      return res.status(500).json({ message: "Error fetching speaker" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.json(results[0]);
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
