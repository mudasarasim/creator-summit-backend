// backend/db.js
const mysql = require("mysql2");

// Create a pool
const pool = mysql.createPool({
  host: "ghattourgroup.com",
  user: "u705255933_creator_summit",
  password: "Creator@122", // your DB password
  database: "u705255933_creator_summit",
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 connections
  queueLimit: 0          // unlimited queued requests
});

// Export the promise-based pool
module.exports = pool.promise();
