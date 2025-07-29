// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'bazarhub.com.pk',
  user: 'u167227426_xpertone',
  password: '9Se44k!+~b=', // your DB password if any
  database: 'u167227426_xpertone'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = db;
