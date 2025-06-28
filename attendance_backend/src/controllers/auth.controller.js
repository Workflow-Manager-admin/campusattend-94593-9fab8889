/**
 * Handles user registration, login, and authentication status.
 */
const authService = require('../services/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication & registration
 */
class AuthController {
  // PUBLIC_INTERFACE
  async register(req, res) {
    /**
     * Registers a user - returns JWT and user data
     */
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields required' });
      }
      const { user, token } = await authService.register({ name, email, password });
      return res.status(201).json({ user, token });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
  // PUBLIC_INTERFACE
  async login(req, res) {
    /**
     * Authenticate user - return JWT and user info on success
     */
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email & password required' });
      }
      const { user, token } = await authService.login({ email, password });
      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  }
  // PUBLIC_INTERFACE
  status(req, res) {
    /**
     * Return basic info if user is authenticated
     */
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    return res.json({ id: req.user.id, email: req.user.email });
  }
}

module.exports = new AuthController();
