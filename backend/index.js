// backend/index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // new
const angelRoutes = require('./routes/angelRoutes');
const angelsRoute = require('./routes/admin/angels');
const adminLoginRoute = require('./routes/adminLogin');
const voteRoutes = require('./routes/votes'); // assuming this is for general vote endpoints
// If voteAdminRoutes is different from voteRoutes, import its proper file:
// const voteAdminRoutes = require('./routes/voteAdmin'); 
// For now, if it's the same, you can omit the duplicate.

const app = express();
const PORT = 3000;

// CORS setup: permissive (allows all origins). For production, restrict to specific origins:
// app.use(cors({ origin: 'https://yourdomain.com' }));
app.use(cors());

// Body parsing
app.use(express.json()); // for JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
app.use(express.static(path.join(__dirname, '..'))); // Serve Creator-Summit-main
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(angelRoutes);
app.use('/api/admin/angels', angelsRoute);
app.use('/api/admin', adminLoginRoute);
app.use('/api', voteRoutes);
// If you have a separate admin votes file, mount it appropriately, e.g.:
// app.use('/api/votes', voteAdminRoutes);

// Fallback / 404 handler (optional)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
