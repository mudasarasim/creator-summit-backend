const express = require('express');
const router = express.Router();
const db = require('../../db'); // db.js connection


// GET all angels
router.get('/', (req, res) => {
  const query = 'SELECT * FROM angels ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching angels:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
router.put('/angels/:id', (req, res) => {
  const angelId = req.params.id;
  const {
    name, email, phone, instagram, tiktok,
    followers, niche, description
  } = req.body;

  const query = `
    UPDATE angels SET
      name = ?, email = ?, phone = ?, instagram = ?, tiktok = ?,
      followers = ?, niche = ?, description = ?
    WHERE id = ?
  `;

  const values = [name, email, phone, instagram, tiktok, followers, niche, description, angelId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: 'Update failed' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Angel not found' });
    }

    res.json({ message: 'Updated successfully' });
  });
});
//delete
router.delete('/:id', (req, res) => {
  const angelId = req.params.id;
  const query = 'DELETE FROM angels WHERE id = ?';

  db.query(query, [angelId], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Angel not found' });
    }

    res.json({ message: 'Deleted successfully' });
  });
})



module.exports = router;
