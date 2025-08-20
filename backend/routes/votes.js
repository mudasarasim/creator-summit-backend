const express = require('express');
const router = express.Router();
const db = require('../db'); // pool.promise()

/**
 * POST /api/vote
 */
router.post('/vote', async (req, res) => {
  try {
    const { name, email, phone, speaker } = req.body;

    if (!name || !email || !phone || !speaker) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const [existing] = await db.query('SELECT * FROM votes WHERE email = ?', [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: 'You have already voted with this email.' });
    }

    // Insert new vote
    await db.query('INSERT INTO votes (name, email, phone, speaker) VALUES (?, ?, ?, ?)', 
      [name, email, phone, speaker]);

    res.json({ message: 'Vote submitted successfully!' });
  } catch (err) {
    console.error('❌ Error inserting vote:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * GET all votes
 */
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM votes ORDER BY id DESC');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching votes:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * GET single speaker by name
 */
router.get('/speakers/:name', async (req, res) => {
  try {
    const speakerName = req.params.name;
    const [results] = await db.query('SELECT * FROM angels WHERE name = ?', [speakerName]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('❌ Error fetching speaker:', err);
    res.status(500).json({ message: 'Error fetching speaker' });
  }
});

/**
 * GET vote results by speaker
 */
router.get('/vote-results', async (req, res) => {
  try {
    const sql = `
      SELECT speaker, COUNT(*) as total_votes
      FROM votes
      GROUP BY speaker
      ORDER BY total_votes DESC
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching vote results:', err);
    res.status(500).json({ message: 'Error fetching vote results' });
  }
});

/**
 * GET all speakers (with votes count)
 */
router.get('/api/speakers', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM speakers ORDER BY votes DESC');
    res.json(results);
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
