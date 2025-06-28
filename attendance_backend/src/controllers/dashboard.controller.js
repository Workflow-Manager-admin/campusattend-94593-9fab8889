/**
 * Handles dashboard API for attendance overview and reporting
 */
const dashboardService = require('../services/dashboard');

class DashboardController {
  // PUBLIC_INTERFACE
  overview(req, res) {
    /**
     * Attendance overview (summary for current user)
     */
    const userId = req.user.id;
    const data = dashboardService.getUserOverview(userId);
    return res.json(data);
  }
  // PUBLIC_INTERFACE
  report(req, res) {
    /**
     * Admin/teacher reporting: all users' attendance (for demonstration)
     */
    // For demo, no role check. Production should check isAdmin
    const report = dashboardService.getAttendanceReport();
    return res.json(report);
  }
}

module.exports = new DashboardController();
