const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'KhubaibisgoodB$y'; // Use env in production

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM admin_users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];

    // ✅ Use bcrypt.compare for hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

module.exports = router;
