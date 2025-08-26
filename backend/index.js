// backend/index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const angelRoutes = require('./routes/angelRoutes');
const angelsRoute = require('./routes/admin/angels');
const adminLoginRoute = require('./routes/adminLogin');
const voteRoutes = require('./routes/votes');
const voteAdminRoutes = require('./routes/votes');

const app = express();
const PORT = 3000;

// ✅ Configure CORS
app.use(cors({
  origin: [
    "http://localhost:3000",     // local frontend
    "http://127.0.0.1:3000",     // alternative local
    "https://dubaicreatorsummit.com",    // replace with your live frontend domain
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use(angelRoutes);
app.use('/api/admin/angels', angelsRoute);
app.use('/api/admin', adminLoginRoute);
app.use('/api/admin/angels', angelsRoute);
app.use('/api', voteRoutes);
app.use('/api/votes', voteAdminRoutes);

// ✅ Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
