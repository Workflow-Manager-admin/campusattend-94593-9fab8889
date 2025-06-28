// PUBLIC_INTERFACE
function requireAuth(req, res, next) {
  /** Express middleware to require JWT and verify user */
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const { verifyToken } = require('../services/auth');
  try {
    const payload = verifyToken(token);
    req.user = payload; // id, email
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
