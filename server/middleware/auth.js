const jwt = require('jsonwebtoken');

// Put in front of any route that only the restaurant owner may use.
// The browser sends:  Authorization: Bearer <token>
module.exports = function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not logged in.' });

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
};
