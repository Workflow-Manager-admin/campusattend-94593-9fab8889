const express = require('express');
const controller = require('../controllers/attendance.controller');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Attendance
 * /attendance/mark:
 *   post:
 *     summary: Mark attendance for today
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance marked
 *       400:
 *         description: Already marked for today
 * /attendance/history:
 *   get:
 *     summary: Get current user's attendance history
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns array of attendance records
 */
router.post('/mark', requireAuth, controller.mark.bind(controller));
router.get('/history', requireAuth, controller.userHistory.bind(controller));

module.exports = router;
