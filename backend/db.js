// backend/db.js
const mysql = require("mysql2");

// Create a pool
const pool = mysql.createPool({
  host: "marfaqsolutions.com",
  user: "u825421948_creator_summit",
  password: "Xpertone@122", // your DB password
  database: "u825421948_creator_summit",
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 connections
  queueLimit: 0          // unlimited queued requests
});

// Export the promise-based pool
module.exports = pool.promise();
