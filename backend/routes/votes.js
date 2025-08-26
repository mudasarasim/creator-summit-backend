const express = require('express');
const router = express.Router();
const db = require('../db'); // pool.promise()

// Make sure at the top of server.js / app.js you have:
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

router.post('/vote', async (req, res) => {
  const { name, email, phone, speaker_id } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !speaker_id?.trim()) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if email already voted
    const [existingVotes] = await db.query('SELECT * FROM votes WHERE email = ?', [email]);
    if (existingVotes.length > 0) {
      return res.status(400).json({ message: 'You have already voted!With This Email' });
    }

    // Insert vote
    await db.query(
      'INSERT INTO votes (name, email, phone, speaker_id) VALUES (?, ?, ?, ?)',
      [name, email, phone, speaker_id]
    );

    return res.status(201).json({ message: '✅ Vote recorded successfully!' });

  } catch (err) {
    console.error('❌ Error in POST /vote:', err);
    return res.status(500).json({ message: 'Error recording vote' });
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

// GET single speaker by id
router.get('/speakers/:id', async (req, res) => {
  try {
    const speakerId = req.params.id;
    const [results] = await db.query('SELECT * FROM angels WHERE id = ?', [speakerId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    res.json(results[0]);
  } catch (err) {
    console.error('❌ Error fetching speaker:', err);
    res.status(500).json({ message: 'Error fetching speaker' });
  }
});

router.get('/vote-results', async (req, res) => {
  try {
    const sql = `
      SELECT s.id, s.name, COUNT(v.id) AS votes
      FROM angels s
      LEFT JOIN votes v ON s.id = v.speaker_id
      GROUP BY s.id, s.name
      ORDER BY votes DESC
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching vote results:', err);
    res.status(500).json({ message: 'Error fetching vote results' });
  }
});


// GET all speakers with vote count
router.get('/speakers', async (req, res) => {
  try {
    const sql = `
      SELECT s.id, s.name, s.description, s.image_url, COUNT(v.id) AS votes
      FROM angels s
      LEFT JOIN votes v ON s.id = v.speaker_id
      GROUP BY s.id, s.name, s.description, s.image_url
      ORDER BY votes DESC
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
