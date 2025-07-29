const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Routes
const angelRoutes = require('./routes/angelRoutes');
const angelsRoute = require('./routes/admin/angels');
const adminLoginRoute = require('./routes/adminLogin');
const voteRoutes = require('./routes/votes');
const voteAdminRoutes = require('./routes/votes');

const app = express();
const PORT = 3000;

// ✅ Enable CORS for all origins (You can restrict this in production)
app.use(cors());

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, '..'))); // Serves Creator-Summit-main
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Register API routes
app.use(angelRoutes);
app.use('/api/admin/angels', angelsRoute);
app.use('/api/admin', adminLoginRoute);
app.use('/api', voteRoutes);
app.use('/api/votes', voteAdminRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
