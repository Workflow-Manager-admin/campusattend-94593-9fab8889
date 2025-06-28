const express = require('express');
const controller = require('../controllers/dashboard.controller');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 * /dashboard/overview:
 *   get:
 *     summary: Get user's dashboard overview
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview data
 * /dashboard/report:
 *   get:
 *     summary: Get all-users attendance report (admin/demo)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance report for all users
 */
router.get('/overview', requireAuth, controller.overview.bind(controller));
router.get('/report', requireAuth, controller.report.bind(controller));

module.exports = router;
