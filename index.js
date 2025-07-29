// backend/index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const angelRoutes = require('./routes/angelRoutes');
const angelsRoute = require('./routes/admin/angels');
const adminLoginRoute = require('./routes/adminLogin');
const voteRoutes = require('./routes/votes'); // adjust path if needed
const voteAdminRoutes = require('./routes/votes'); // ✅







const app = express();
const PORT = 3000;
// ✅ Add this
app.use(express.json()); // for JSON payloads
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..'))); // Serve Creator-Summit-main
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(angelRoutes);
app.use('/api/admin/angels', angelsRoute);
app.use('/api/admin', adminLoginRoute);
app.use('/api/admin/angels', angelsRoute);
app.use('/api', voteRoutes);
app.use('/api/votes', voteAdminRoutes); // ✅
// server.js


// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
