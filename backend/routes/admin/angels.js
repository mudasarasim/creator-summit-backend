const express = require('express');
const router = express.Router();
const db = require('../../db'); // db.js exports pool.promise()

/**
 * GET all angels
 */
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM angels ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching angels:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * UPDATE angel by ID
 */
router.put('/:id', async (req, res) => {
  try {
    const angelId = req.params.id;
    const {
      name, email, phone, instagram, tiktok,
      youtube, followers, niche, other_niche, description
    } = req.body;

    const query = `
      UPDATE angels SET
        name = ?, email = ?, phone = ?, instagram = ?, tiktok = ?, 
        youtube = ?, followers = ?, niche = ?, other_niche = ?, description = ?
      WHERE id = ?
    `;

    const values = [
      name, email, phone, instagram, tiktok, youtube || null,
      followers, niche, other_niche || null, description, angelId
    ];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Angel not found' });
    }

    res.json({ message: 'Updated successfully' });
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

/**
 * DELETE angel by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const angelId = req.params.id;
    const [result] = await db.query('DELETE FROM angels WHERE id = ?', [angelId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Angel not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get single angel by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM angels WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Angel not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
