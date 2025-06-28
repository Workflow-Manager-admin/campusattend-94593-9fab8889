const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
/**
 * @swagger
 * tags:
 *   - name: Auth
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registered and JWT returned
 *       400:
 *         description: Error: Email exists or data missing
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authenticated and JWT returned
 *       401:
 *         description: Bad credentials
 */
router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));
router.get('/status', controller.status.bind(controller));

module.exports = router;
