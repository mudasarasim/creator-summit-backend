// backend/db.js
const mysql = require("mysql2");

// Create a pool
const pool = mysql.createPool({
  host: "bazarhub.com.pk",
  user: "u167227426_xpertone",
  password: "9Se44k!+~b=", // your DB password
  database: "u167227426_xpertone",
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 connections
  queueLimit: 0          // unlimited queued requests
});

// Export the promise-based pool
module.exports = pool.promise();
