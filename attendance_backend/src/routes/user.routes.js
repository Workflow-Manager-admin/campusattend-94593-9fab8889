const express = require('express');
const controller = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 * /user/profile:
 *   get:
 *     summary: Get user's own profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *   put:
 *     summary: Update user's profile and settings
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: object
 *               settings:
 *                 type: object
 *     responses:
 *       200:
 *         description: Updated profile returned
 */
router.get('/profile', requireAuth, controller.getProfile.bind(controller));
router.put('/profile', requireAuth, controller.updateProfile.bind(controller));

module.exports = router;
