const bcrypt = require('bcryptjs');
const db = require('./db'); // adjust path if needed

const username = 'admin';
const password = 'admin@123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  db.query('INSERT INTO admin_users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
    if (err) throw err;
    console.log('✅ Admin user created successfully');
    process.exit(); // exit script after done
  });
});
