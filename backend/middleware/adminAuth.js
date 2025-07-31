const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuth;
