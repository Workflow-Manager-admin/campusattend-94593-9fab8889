/**
 * Handles profile and settings management for users.
 */
const { findUserById, updateUser } = require('../models/user.model');

class UserController {
  // PUBLIC_INTERFACE
  getProfile(req, res) {
    /**
     * Returns user's public profile and settings.
     */
    const user = findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({
      id: user.id, name: user.name, email: user.email,
      profile: user.profile || {}, settings: user.settings || {}
    });
  }

  // PUBLIC_INTERFACE
  updateProfile(req, res) {
    /**
     * Allows update of profile and settings (except password/email)
     */
    const { profile, settings } = req.body;
    let user = findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user = updateUser(req.user.id, {
      profile: { ...user.profile, ...(profile || {}) },
      settings: { ...user.settings, ...(settings || {}) }
    });
    return res.json({
      id: user.id, name: user.name, email: user.email,
      profile: user.profile, settings: user.settings
    });
  }
}

module.exports = new UserController();
