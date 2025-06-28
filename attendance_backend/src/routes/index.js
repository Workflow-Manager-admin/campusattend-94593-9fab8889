const express = require('express');
const healthController = require('../controllers/health');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const attendanceRoutes = require('./attendance.routes');
const dashboardRoutes = require('./dashboard.routes');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
// Health check endpoint for monitoring service availability
router.get('/', healthController.check.bind(healthController));



router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
