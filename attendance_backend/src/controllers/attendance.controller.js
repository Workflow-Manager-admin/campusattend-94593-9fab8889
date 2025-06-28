/**
 * Handles attendance marking, retrieving, and reporting
 */
const attendanceService = require('../services/attendance');

class AttendanceController {
  // PUBLIC_INTERFACE
  mark(req, res) {
    /**
     * Mark user's attendance for today (one mark per day)
     */
    const userId = req.user.id;
    try {
      const result = attendanceService.markAttendance(userId);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
  // PUBLIC_INTERFACE
  userHistory(req, res) {
    /**
     * Returns array of user's attendance records
     */
    const userId = req.user.id;
    const records = attendanceService.getUserAttendanceHistory(userId);
    return res.json({ userId, records });
  }
}

module.exports = new AttendanceController();
